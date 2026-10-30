#!/usr/bin/env node
/**
 * 在微信小程序服务类目数据中检索。
 * 用法:
 *   node lookup.cjs --list
 *   node lookup.cjs 课程 直播 --entity non-individual
 *   node lookup.cjs 电商平台 --category 电商平台 --full
 */
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'references', 'categories.json');
const ENTITY_ALIASES = {
  'non-individual': 'non-individual',
  non: 'non-individual',
  enterprise: 'non-individual',
  individual: 'individual',
  personal: 'individual',
  overseas: 'overseas',
  all: 'all',
};

function parseArgs(argv) {
  const opts = { keywords: [], entity: 'all', category: null, full: false, limit: 8, list: false, json: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--entity') {
      const val = argv[++i];
      const entity = ENTITY_ALIASES[val];
      if (!entity) {
        console.error('未知主体类型: ' + val + '（可选 non-individual / individual / overseas / all）');
        process.exit(1);
      }
      opts.entity = entity;
    } else if (arg === '--category') {
      opts.category = argv[++i] || '';
    } else if (arg === '--full') {
      opts.full = true;
    } else if (arg === '--limit') {
      opts.limit = Math.max(1, parseInt(argv[++i], 10) || 8);
    } else if (arg === '--list') {
      opts.list = true;
    } else if (arg === '--json') {
      opts.json = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg.startsWith('--')) {
      console.error('未知参数: ' + arg);
      process.exit(1);
    } else {
      opts.keywords.push(arg);
    }
  }
  return opts;
}

function printHelp() {
  console.log(`用法:
  node lookup.cjs --list
  node lookup.cjs <关键词...> [--entity non-individual|individual|overseas|all] [--category 一级分类] [--limit 8] [--full] [--json]

示例:
  node lookup.cjs 课程 直播
  node lookup.cjs 电商平台 --entity non-individual --category 电商平台
  node lookup.cjs AI 绘画 --full`);
}

function truncate(text, max) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? clean.slice(0, max) + '…' : clean;
}

function loadData() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error('类目数据不存在: ' + DATA_PATH);
    console.error('请先运行 node build_categories.cjs <source.md> 生成数据。');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}

function entityLabel(entity) {
  return entity.name;
}

function list(data) {
  console.log('数据快照: ' + data.meta.generatedAt + '（以平台提交页面为准）');
  for (const entity of data.entities) {
    const groups = new Map();
    for (const item of entity.items) {
      groups.set(item['一级分类'], (groups.get(item['一级分类']) || 0) + 1);
    }
    console.log(`\n[${entityLabel(entity)}] ${entity.items.length} 条`);
    console.log(
      [...groups.entries()].map(([name, count]) => `${name}(${count})`).join('  ')
    );
  }
}

function tokenize(keywords) {
  return keywords
    .flatMap((k) => k.split(/[\s,，;；、/]+/))
    .map((k) => k.trim())
    .filter(Boolean);
}

function scoreItem(item, terms) {
  const name = [item['二级分类'], item['三级分类']].join(' ');
  const fullName = [item['一级分类'], name].join(' ');
  const scope = item['类目适用范围'];
  const qualifications = item['资质要求'];
  const remark = item['备注'];
  let score = 0;
  let matched = 0;
  for (const term of terms) {
    const lower = term.toLowerCase();
    let hit = false;
    if (item['二级分类'].toLowerCase() === lower || item['三级分类'].toLowerCase() === lower) {
      score += 120;
      hit = true;
    } else if (name.toLowerCase().includes(lower)) {
      score += 50;
      hit = true;
    }
    if (item['一级分类'].toLowerCase().includes(lower)) {
      score += 20;
      hit = true;
    }
    if (scope.toLowerCase().includes(lower)) {
      score += 10;
      hit = true;
    }
    if (qualifications.toLowerCase().includes(lower)) {
      score += 6;
      hit = true;
    }
    if (remark.toLowerCase().includes(lower)) {
      score += 4;
      hit = true;
    }
    if (hit) matched++;
  }
  if (!matched) return 0;
  if (matched === terms.length) score += 40;
  return score;
}

function describe(item, full) {
  const pathName = [item['一级分类'], item['二级分类']];
  if (item['三级分类'] && item['三级分类'] !== '/') pathName.push(item['三级分类']);
  const lines = [pathName.join(' > ')];
  lines.push('  资质: ' + (full ? item['资质要求'] : truncate(item['资质要求'], 180)));
  lines.push('  范围: ' + (full ? item['类目适用范围'] : truncate(item['类目适用范围'], 140)));
  if (item['备注'] && item['备注'] !== '/') {
    lines.push('  备注: ' + (full ? item['备注'] : truncate(item['备注'], 100)));
  }
  return lines.join('\n');
}

function search(data, opts) {
  const terms = tokenize(opts.keywords);
  if (!terms.length) {
    console.error('请提供关键词，或使用 --list 查看一级分类。');
    process.exit(1);
  }
  const results = [];
  for (const entity of data.entities) {
    if (opts.entity !== 'all' && entity.id !== opts.entity) continue;
    for (const item of entity.items) {
      if (opts.category && item['一级分类'] !== opts.category) continue;
      const score = scoreItem(item, terms);
      if (score > 0) results.push({ entity, item, score });
    }
  }
  results.sort((a, b) => b.score - a.score || a.item['一级分类'].localeCompare(b.item['一级分类']));
  const top = results.slice(0, opts.limit);

  if (opts.json) {
    console.log(JSON.stringify(top.map((r) => ({ entity: r.entity.name, ...r.item })), null, 2));
    return;
  }
  if (!top.length) {
    console.log('未找到匹配类目。可换同义词，或 --list 查看一级分类后按 --category 检索。');
    return;
  }
  console.log(`匹配 ${results.length} 条，显示前 ${top.length} 条（数据快照 ${data.meta.generatedAt}）`);
  for (const { entity, item } of top) {
    console.log('\n[' + entityLabel(entity) + '] ' + describe(item, opts.full));
  }
  console.log('\n提示: 资质要求原文中的“注”常包含必须补充的关联类目，审核时需逐条核对。');
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const data = loadData();
  if (opts.list) list(data);
  else search(data, opts);
}

main();
