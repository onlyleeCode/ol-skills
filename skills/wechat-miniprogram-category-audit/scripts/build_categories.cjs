#!/usr/bin/env node
/**
 * 将微信小程序服务类目文档（Markdown + json 代码块）解析为结构化 JSON。
 * 用法: node build_categories.cjs <source.md> [out.json]
 */
const fs = require('fs');
const path = require('path');

const FIELDS = ['二级分类', '三级分类', '资质要求', '类目适用范围', '备注'];

const ENTITY_MAP = [
  { test: /^非个人主体/, id: 'non-individual', name: '非个人主体' },
  { test: /^个人主体/, id: 'individual', name: '个人主体' },
  { test: /^境外主体/, id: 'overseas', name: '境外主体' },
];

function normalizeValue(raw) {
  return raw
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/(\d+)\.\s+\1\.\s*/g, '$1. ')
    .trim();
}

function parseFields(objText) {
  const fields = {};
  let cursor = 0;
  while (cursor < objText.length) {
    const keyMatch = /"([^"]+)"\s*:\s*"/.exec(objText.slice(cursor));
    if (!keyMatch) break;
    const key = keyMatch[1];
    let pos = cursor + keyMatch.index + keyMatch[0].length;
    let value = '';
    while (pos < objText.length) {
      const ch = objText[pos];
      if (ch === '\\') {
        value += ch + (objText[pos + 1] || '');
        pos += 2;
        continue;
      }
      if (ch === '"') {
        let next = pos + 1;
        while (next < objText.length && /\s/.test(objText[next])) next++;
        if (objText[next] === ',' || objText[next] === '}' || next >= objText.length) break;
      }
      value += ch;
      pos++;
    }
    fields[key] = normalizeValue(value);
    cursor = pos + 1;
  }
  return fields;
}

function splitObjects(blockText) {
  const objects = [];
  let current = null;
  for (const line of blockText.split('\n')) {
    if (/^  \{$/.test(line)) {
      current = [];
      continue;
    }
    if (/^  \},?$/.test(line)) {
      if (current) objects.push(current.join('\n'));
      current = null;
      continue;
    }
    if (current) current.push(line);
  }
  return objects;
}

function appendNote(note, addition) {
  if (!note || note === '/') return addition;
  return note + '\n' + addition;
}

function build(sourcePath) {
  const text = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');
  const entities = [];
  let entity = null;
  let level1 = null;
  let inJson = false;
  let block = [];
  let currentObject = null;
  const anomalies = [];

  const pushEntity = (name) => {
    const def = ENTITY_MAP.find((e) => e.test.test(name));
    entity = {
      id: def ? def.id : name,
      name: def ? def.name : name,
      items: [],
    };
    entities.push(entity);
  };

  const flushBlock = () => {
    for (const objText of splitObjects(block.join('\n'))) {
      const raw = parseFields(objText);
      const item = {
        一级分类: level1,
        二级分类: raw['二级分类'] || '',
        三级分类: raw['三级分类'] || '',
        资质要求: raw['资质要求'] || '',
        类目适用范围: raw['类目适用范围'] || '',
        备注: raw['备注'] || '',
      };
      if (!item.二级分类) {
        anomalies.push(`无法解析二级分类: ${objText.slice(0, 60)}`);
        continue;
      }
      const missingKeys = FIELDS.filter((k) => !(k in raw));
      if (missingKeys.length) {
        anomalies.push(`${level1}/${item.二级分类} 缺少字段: ${missingKeys.join(',')}`);
      }
      const isEmpty = !item.资质要求 && !item.类目适用范围 && !item.备注;
      if (isEmpty) {
        const prev = entity.items[entity.items.length - 1];
        if (prev && prev['一级分类'] === level1) {
          item.二级分类 = prev['二级分类'];
          item.三级分类 = raw['二级分类'];
          item.资质要求 = prev['资质要求'];
          item.类目适用范围 = prev['类目适用范围'];
          item.备注 = prev['备注'];
          item.推断 = true;
        }
      }
      if (/^适用于/.test(item.三级分类) && !item.类目适用范围) {
        item.类目适用范围 = item.三级分类;
        item.三级分类 = '/';
        item.备注 = appendNote(item.备注, '原文档将类目说明放在三级分类栏，已归位。');
        const prev = entity.items[entity.items.length - 1];
        if (
          prev &&
          prev['一级分类'] === level1 &&
          item.二级分类.startsWith(prev['二级分类']) &&
          item.二级分类.length > prev['二级分类'].length
        ) {
          item.三级分类 = item.二级分类.slice(prev['二级分类'].length);
          item.二级分类 = prev['二级分类'];
        }
        if (
          (!item.资质要求 || item.资质要求 === '/') &&
          prev &&
          prev['一级分类'] === level1 &&
          item.二级分类 === prev['二级分类']
        ) {
          item.资质要求 = prev['资质要求'];
          item.备注 = appendNote(item.备注, '资质要求原表并入上一条目，已按上一条目展示。');
          item.推断 = true;
        }
      }
      if (/^适用于/.test(item.资质要求) && (!item.类目适用范围 || item.类目适用范围 === '/')) {
        item.类目适用范围 = item.资质要求;
        item.资质要求 = '/';
        item.备注 = appendNote(item.备注, '原文档资质要求栏缺失，需以平台申请页为准。');
        item.推断 = true;
      }
      if (!item.三级分类) item.三级分类 = '/';
      if (!item.资质要求) item.资质要求 = '/';
      if (!item.类目适用范围) item.类目适用范围 = '/';
      if (!item.备注) item.备注 = '/';
      entity.items.push(item);
      currentObject = item;
    }
    block = [];
  };

  for (const line of text.split('\n')) {
    if (line.startsWith('## ')) {
      if (inJson) {
        flushBlock();
        inJson = false;
      }
      pushEntity(line.slice(3).trim());
      level1 = null;
      continue;
    }
    if (line.startsWith('### ')) {
      level1 = line.slice(4).trim();
      continue;
    }
    if (line.trim() === '```json') {
      inJson = true;
      block = [];
      continue;
    }
    if (inJson && line.trim() === '```') {
      flushBlock();
      inJson = false;
      continue;
    }
    if (inJson) block.push(line);
  }

  const data = {
    meta: {
      title: '微信小程序开放的服务类目',
      sourceFile: path.basename(sourcePath),
      generatedAt: new Date().toISOString().slice(0, 10),
      note: '类目与资质要求会随平台政策变化，最终以微信公众平台提交页面为准。推断=true 表示原文档该行字段为空或字段错位，已按上级类目归并或归位，使用时结合备注核对。',
    },
    entities,
  };

  const total = entities.reduce((sum, e) => sum + e.items.length, 0);
  const inferred = entities.reduce(
    (sum, e) => sum + e.items.filter((i) => i.推断).length,
    0
  );
  return { data, total, inferred, anomalies };
}

function main() {
  const source = process.argv[2];
  if (!source) {
    console.error('用法: node build_categories.cjs <source.md> [out.json]');
    process.exit(1);
  }
  const out =
    process.argv[3] || path.join(__dirname, '..', 'references', 'categories.json');
  const { data, total, inferred, anomalies } = build(source);
  fs.writeFileSync(out, JSON.stringify(data, null, 2) + '\n', 'utf8');
  const stats = data.entities
    .map((e) => `${e.name}: ${e.items.length} 条`)
    .join(' | ');
  console.log(`已生成 ${out}`);
  console.log(`${stats} | 合计 ${total} 条 | 归并子项 ${inferred} 条`);
  if (anomalies.length) {
    console.log(`解析异常 ${anomalies.length} 处:`);
    for (const a of anomalies.slice(0, 10)) console.log(`- ${a}`);
  } else {
    console.log('解析异常: 0');
  }
}

if (require.main === module) main();

module.exports = { build };
