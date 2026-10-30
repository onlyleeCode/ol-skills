#!/usr/bin/env node
/**
 * 扫描小程序项目，提取业务功能线索，用于类目覆盖审核。
 * 用法: node scan_project.cjs <project-dir> [--limit 15] [--max-files 6000] [--json]
 */
const fs = require('fs');
const path = require('path');

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', 'unpackage', 'miniprogram_npm',
  'uni_modules', 'coverage', '.hbuilderx', '.idea', '.vscode', '.qoder',
  'Pods', '.gradle', 'target', 'vendor', '.next', '.nuxt', '.cache',
]);

const SCAN_EXTS = new Set([
  '.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.vue', '.nvue', '.uts',
  '.json', '.wxml', '.wxs', '.html', '.py', '.go', '.java', '.php', '.kt',
  '.cs', '.rb', '.yml', '.yaml',
]);

const SIGNALS = [
  {
    id: 'ecommerce',
    label: '商品销售/电商',
    hints: ['商家自营 > <对应商品品类>（单商家自营）', '电商平台 > 电商平台（多商家入驻）'],
    keywords: ['商品', '购物车', '下单', '订单', 'sku', '库存', '收货地址', '结算', '退款', '售后', '包邮', '商品详情', 'goods', 'product', 'cart', 'checkout', 'orderId', 'orderNo', 'mall'],
  },
  {
    id: 'multi-merchant',
    label: '多商家/平台入驻',
    hints: ['电商平台 > 电商平台', '教育服务 > 教育平台', '餐饮服务 > 外卖平台 / 点餐平台', '医疗服务 > 非处方药销售平台 / 医疗器械经营销售平台'],
    keywords: ['入驻', '商家入驻', '商户', '多商户', '多商家', '店铺', '供应商', '平台商家', '分账', 'merchant', 'seller', 'storeId', 'shopId', 'tenant'],
  },
  {
    id: 'catering',
    label: '餐饮/点餐',
    hints: ['餐饮服务 > 餐饮服务场所/餐饮服务管理企业 > <菜系>（堂食门店）', '餐饮服务 > 外卖平台 / 点餐平台（多商家）', '餐饮服务 > 餐厅排队'],
    keywords: ['点餐', '菜品', '菜单', '餐桌', '桌号', '外卖', '取号', '排号', '堂食', '餐厅', 'restaurant', 'dish', 'menu', 'takeout', 'tableNo'],
  },
  {
    id: 'education',
    label: '教育/课程',
    hints: ['教育服务 > 在线视频课程 / 其他在线视频课程', '教育服务 > 课程销售 / 课程销售平台', '教育服务 > 学历教育（学校）/ 学历教育（培训机构）/ 非学科类培训机构 / 成人技能培训'],
    keywords: ['课程', '课时', '学员', '讲师', '教师', '报名', '网课', '作业', '考试', '题库', '班级', 'course', 'lesson', 'student', 'teacher', 'homework', 'exam', 'curriculum'],
  },
  {
    id: 'live',
    label: '直播',
    hints: ['社交 > 直播（非表演类）', '社交 > 直播表演（表演类）', '教育服务 > 在线视频课程（教育直播）'],
    keywords: ['直播', '推流', '拉流', '连麦', '直播间', 'live-player', 'live-pusher', 'rtmp', 'webrtc', 'liveRoom'],
  },
  {
    id: 'community',
    label: '社区/短视频/内容互动',
    hints: ['社交 > 社区/论坛 / 笔记', '社交 > 熟人交友 / 陌生人交友', '文娱 > 视频广场 / 其他视频 / 微短剧'],
    keywords: ['动态', '帖子', '点赞', '关注', '私信', '粉丝', '话题', '社区', '论坛', '短视频', 'feed', 'post', 'comment', 'follow', 'moment', 'forum', 'dm'],
  },
  {
    id: 'medical',
    label: '医疗健康',
    hints: ['医疗服务 > 互联网医院', '医疗服务 > 就医服务 > 挂号 / 查报告单', '医疗服务 > 药品信息展示 / 药品（非处方药）销售', '医疗服务 > 医疗器械自营'],
    keywords: ['问诊', '挂号', '医生', '处方', '病历', '药品', '医疗器械', '体检', '疫苗', '医院', '诊所', 'doctor', 'prescription', 'medicine', 'hospital', 'clinic', 'patient'],
  },
  {
    id: 'finance',
    label: '金融',
    hints: ['金融业 > 银行 / 保险 / 公募基金 / 证券/期货', '金融业 > 贷款信息服务 / 信用卡 / 消费金融'],
    keywords: ['理财', '基金', '保险', '贷款', '信用卡', '分期', '证券', '股票', '征信', '黄金', '外汇', 'finance', 'invest', 'insurance', 'loan', 'creditCard', 'securities', 'fund'],
  },
  {
    id: 'payment',
    label: '支付/交易',
    hints: ['涉及实物或服务销售：需对应商家自营/平台类目', '课程、会员等虚拟商品：安卓端需接入小程序虚拟支付并具备对应类目'],
    keywords: ['支付', '收银台', '充值', '余额', '提现', '会员卡', '储值', '金币', '积分', 'requestPayment', 'cashier', 'recharge', 'withdraw', 'wallet'],
  },
  {
    id: 'travel',
    label: '旅游/票务',
    hints: ['旅游服务 > 住宿服务 / 景区服务 / 旅行社 / OTA / 签证办理', '生活服务 > 营业性演出票务'],
    keywords: ['酒店', '民宿', '机票', '火车票', '门票', '景区', '旅游', '行程', '签证', '导游', 'hotel', 'flight', 'travel', 'visa', 'scenic', 'itinerary', 'ticket'],
  },
  {
    id: 'realestate',
    label: '房地产',
    hints: ['房地产服务 > 房地产营销 / 物业管理', '房地产服务 > 房屋中介 > 租房 / 新房 / 二手房', '房地产服务 > 房屋装修'],
    keywords: ['房源', '租房', '二手房', '新房', '楼盘', '房贷', '中介', '物业', '房东', '租客', 'house', 'rent', 'estate', 'property', 'landlord', 'tenant'],
  },
  {
    id: 'auto',
    label: '汽车服务',
    hints: ['汽车服务 > 维修保养 / 汽车报价/比价 / 汽车经销商/4S店', '汽车服务 > 汽车预售 / 二手车 / 汽车用品'],
    keywords: ['汽车', '4S', '二手车', '试驾', '保养', '洗车', '车险', '车牌', '购车', 'car', 'vehicle', 'testDrive'],
  },
  {
    id: 'recruit',
    label: '招聘/求职',
    hints: ['生活服务 > 求职/招聘（个人主体未开放）', '生活服务 > 求职/招聘（涉外）'],
    keywords: ['招聘', '简历', '求职', '职位', '面试', '入职', '薪资', 'job', 'resume', 'recruit', 'position', 'salary'],
  },
  {
    id: 'life',
    label: '生活服务',
    hints: ['生活服务 > 家政服务 / 跑腿 / 婚庆服务 / 宠物（非医院类）', '生活服务 > 丽人服务 > 美甲/美容/美发等', '生活服务 > 洗浴保健'],
    keywords: ['家政', '保洁', '维修', '美甲', '美容', '美发', '婚庆', '宠物', '洗衣', '按摩', '推拿', '保姆', '月嫂', '跑腿', 'housekeeping', 'beauty', 'repair', 'pet', 'laundry'],
  },
  {
    id: 'gov',
    label: '政务民生',
    hints: ['政务民生 > <对应部门>（个人主体未开放）'],
    keywords: ['政务', '办事', '预约办', '公积金', '社保', '医保', '户籍', '政府', '街道', 'government', 'gov', 'publicService'],
  },
  {
    id: 'charity',
    label: '公益/募捐',
    hints: ['公益 > 慈善信息服务 / 募捐服务 / 个人求助网络服务平台 / 网络互助'],
    keywords: ['公益', '捐赠', '慈善', '志愿者', '募捐', '爱心', 'charity', 'donate', 'donation', 'volunteer'],
  },
  {
    id: 'entertainment',
    label: '文娱内容',
    hints: ['文娱 > 网络小说 / 音乐 / 有声读物 / 动漫 / 微短剧 / 其他视频 / 电台 / 出版物'],
    keywords: ['音乐', '小说', '漫画', '动漫', '影视', '综艺', '演出', '听书', '短剧', 'music', 'novel', 'comic', 'movie', 'drama', 'audioBook', 'podcast'],
  },
  {
    id: 'news',
    label: '资讯',
    hints: ['资讯 > 信息资讯（单一行业）', '文娱 > 资讯广场（多行业）', '时政信息 > 时政信息'],
    keywords: ['资讯', '新闻', '头条', '热点', '文章', '快讯', 'news', 'article', 'headline'],
  },
  {
    id: 'tools',
    label: '工具',
    hints: ['工具 > 计算器 / 日历 / 天气 / 记账 / 备忘录 / 图片处理 / 信息查询 / 预约/报名 / 健康管理'],
    keywords: ['计算器', '日历', '天气', '翻译', '二维码', '录音', '记账', '笔记', '投票', '报价', 'calculator', 'calendar', 'weather', 'qrcode', 'translate', 'memo'],
  },
  {
    id: 'ai',
    label: 'AI/深度合成',
    hints: ['深度合成 > AI问答 / AI绘画 / AI换脸 / AI创作 / 拟人化互动', '需《互联网信息服务算法备案》（生成合成类）并显著标注 AI 生成内容'],
    keywords: ['AI', '人工智能', '大模型', '生成式', '智能问答', '换脸', '文生图', 'AI绘画', 'AI创作', '陪伴', 'chatbot', 'openai', 'gpt', 'llm', 'stable-diffusion', 'midjourney', 'dashscope', 'deepseek', 'langchain'],
  },
  {
    id: 'logistics',
    label: '物流/快递',
    hints: ['物流服务 > 快递柜 / 收件派件 / 查件', '物流服务 > 仓储服务 / 货物运输 / 装卸搬运'],
    keywords: ['快递', '物流', '运单', '寄件', '仓储', '配送', '发货', '驿站', 'express', 'logistics', 'shipping', 'courier', 'waybill', 'warehouse'],
  },
  {
    id: 'sports',
    label: '体育/健身',
    hints: ['体育 > 体育场馆服务 / 体育培训 / 在线健身 / 体育赛事/电子竞技赛'],
    keywords: ['健身', '场馆', '场地预约', '赛事', '运动', '教练', '瑜伽', '游泳', 'gym', 'fitness', 'sport', 'coach', 'stadium'],
  },
  {
    id: 'dating',
    label: '婚恋/交友',
    hints: ['社交 > 婚恋 / 陌生人交友 / 熟人交友'],
    keywords: ['交友', '相亲', '婚恋', '恋爱', '匹配', 'dating', 'matchmaker'],
  },
  {
    id: 'ugc',
    label: '内容发布/UGC',
    hints: ['社交 > 社区/论坛 / 笔记', '文娱 > 视频广场', '需具备内容审核与安全机制'],
    keywords: ['发布', '发帖', '上传视频', '上传图片', '内容审核', 'upload', 'publish', 'mediaUpload'],
  },
  {
    id: 'map',
    label: '地图/定位',
    hints: ['交通服务 > 互联网地图服务 / 导航地图（自建地图服务时）', '仅调用定位能力不单独需要类目'],
    keywords: ['地图', '定位', '导航', '附近', 'map', 'location', 'geolocation', 'amap', 'baiduMap', 'tencentMap'],
  },
  {
    id: 'minors',
    label: '未成年人保护',
    hints: ['合规提示：实名认证、防沉迷、未成年人保护', '拟人化互动服务向未满14周岁用户提供需监护人同意'],
    keywords: ['青少年', '未成年人', '实名认证', '防沉迷', '家长', 'minor', 'guardian'],
  },
  {
    id: 'prepaid',
    label: '会员/预付卡',
    hints: ['商家自营 > 预付卡 > 发行方（自发行单用途预付卡）', '商家自营 > 预付卡 > 代售（代售/充值会员卡、储值卡）'],
    keywords: ['会员卡', '储值卡', '预付卡', '充值卡', '次卡', '年卡', 'membership', 'prepaid', 'storedValue'],
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildRegex(keyword) {
  const escaped = escapeRegExp(keyword);
  const asciiWord = /^[A-Za-z0-9_-]+$/.test(keyword);
  return asciiWord
    ? new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`, 'gi')
    : new RegExp(escaped, 'g');
}

const SIGNAL_PATTERNS = SIGNALS.map((signal) => ({
  ...signal,
  patterns: signal.keywords.map(buildRegex),
}));

function parseArgs(argv) {
  const opts = { dir: process.cwd(), limit: 15, maxFiles: 6000, json: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--limit') opts.limit = Math.max(1, parseInt(argv[++i], 10) || 15);
    else if (arg === '--max-files') opts.maxFiles = Math.max(100, parseInt(argv[++i], 10) || 6000);
    else if (arg === '--json') opts.json = true;
    else if (arg === '--help' || arg === '-h') {
      console.log('用法: node scan_project.cjs <project-dir> [--limit 15] [--max-files 6000] [--json]');
      process.exit(0);
    } else if (arg.startsWith('--')) {
      console.error('未知参数: ' + arg);
      process.exit(1);
    } else {
      opts.dir = path.resolve(arg);
    }
  }
  return opts;
}

function walk(dir, maxFiles) {
  const files = [];
  const stack = [dir];
  while (stack.length && files.length < maxFiles) {
    const current = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) stack.push(full);
      } else if (entry.isFile()) {
        files.push(full);
        if (files.length >= maxFiles) break;
      }
    }
  }
  return files;
}

function lineNumberAt(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

function detectProjectType(dir, files) {
  const names = new Set(files.map((f) => path.basename(f)));
  if (names.has('pages.json') && names.has('manifest.json')) return 'uni-app';
  if (names.has('app.config.ts') || names.has('config/index.js')) return 'Taro / 自定义框架';
  if (names.has('app.json') && names.has('project.config.json')) return '微信原生小程序';
  if (names.has('app.json')) return '小程序（app.json）';
  return '未识别（未找到 pages.json / app.json）';
}

function collectConfig(files, dir, result) {
  const pagePaths = new Set();
  const titles = new Set();
  const deps = new Set();
  const packageJsons = files
    .filter((f) => path.basename(f) === 'package.json')
    .sort((a, b) => a.split(path.sep).length - b.split(path.sep).length)
    .slice(0, 2);

  for (const file of files) {
    const base = path.basename(file);
    const rel = path.relative(dir, file).replace(/\\/g, '/');
    if (base === 'pages.json' || base === 'app.json') {
      let text = '';
      try {
        text = fs.readFileSync(file, 'utf8');
      } catch {
        continue;
      }
      for (const match of text.matchAll(/"path"\s*:\s*"([^"]+)"/g)) pagePaths.add(match[1]);
      for (const match of text.matchAll(/"pagePath"\s*:\s*"([^"]+)"/g)) pagePaths.add(match[1]);
      for (const match of text.matchAll(/"navigationBarTitleText"\s*:\s*"([^"]+)"/g)) titles.add(match[1]);
      if (text.includes('"tabBar"')) {
        for (const match of text.matchAll(/"text"\s*:\s*"([^"]+)"/g)) titles.add(match[1]);
      }
      result.configFiles.push(rel);
    } else if (base.endsWith('.json') && base !== 'package.json' && base !== 'package-lock.json') {
      if (file.includes(path.sep + 'node_modules' + path.sep)) continue;
      let text = '';
      try {
        text = fs.readFileSync(file, 'utf8');
      } catch {
        continue;
      }
      if (text.includes('"navigationBarTitleText"')) {
        for (const match of text.matchAll(/"navigationBarTitleText"\s*:\s*"([^"]+)"/g)) titles.add(match[1]);
      }
    }
  }

  const depKeywords = /(^|[-_/@])(pay|payment|live|video|player|map|location|chat|im|openai|gpt|llm|ai|course|shop|mall|upload|qcloud|tencentcloud|wx-server)([-_/@]|$)/i;
  for (const file of packageJsons) {
    try {
      const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
      const all = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      for (const name of Object.keys(all)) if (depKeywords.test(name)) deps.add(name);
    } catch {
      // 忽略无法解析的 package.json
    }
  }

  result.pagePaths = [...pagePaths].slice(0, 40);
  result.pageCount = pagePaths.size;
  result.titles = [...titles].slice(0, 30);
  result.deps = [...deps].slice(0, 20);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(opts.dir) || !fs.statSync(opts.dir).isDirectory()) {
    console.error('目录不存在: ' + opts.dir);
    process.exit(1);
  }
  const files = walk(opts.dir, opts.maxFiles);
  const result = {
    project: opts.dir,
    type: detectProjectType(opts.dir, files),
    scannedFiles: files.length,
    configFiles: [],
    pageCount: 0,
    pagePaths: [],
    titles: [],
    deps: [],
    groups: [],
  };
  collectConfig(files, opts.dir, result);

  const groups = SIGNAL_PATTERNS.map((signal) => ({
    id: signal.id,
    label: signal.label,
    hints: signal.hints,
    patterns: signal.patterns,
    count: 0,
    fileCount: 0,
    examples: [],
    configExamples: [],
    _files: new Set(),
  }));

  let scanned = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!SCAN_EXTS.has(ext)) continue;
    const base = path.basename(file).toLowerCase();
    if (base.includes('.min.') || base.endsWith('.map') || base.includes('lock')) continue;
    let stat;
    try {
      stat = fs.statSync(file);
    } catch {
      continue;
    }
    if (stat.size > 1024 * 1024) continue;
    let text;
    try {
      text = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    if (text.includes('\u0000')) continue;
    scanned++;
    const rel = path.relative(opts.dir, file).replace(/\\/g, '/');
    const isConfigFile = base === 'pages.json' || base === 'app.json';

    for (const group of groups) {
      let groupCount = 0;
      for (const pattern of group.patterns) {
        pattern.lastIndex = 0;
        for (const match of text.matchAll(pattern)) {
          groupCount++;
          const bucket = isConfigFile ? group.configExamples : group.examples;
          if (bucket.length < 3) {
            const line = lineNumberAt(text, match.index || 0);
            const example = `${rel}:${line}`;
            if (!bucket.includes(example)) bucket.push(example);
          }
          if (groupCount > 999) break;
        }
        if (groupCount > 999) break;
      }
      if (groupCount > 0) {
        group.count += groupCount;
        group._files.add(rel);
      }
    }
  }

  result.scannedFiles = scanned;
  result.groups = groups
    .filter((g) => g.count > 0)
    .map((g) => ({
      id: g.id,
      label: g.label,
      hints: g.hints,
      count: g.count,
      fileCount: g._files.size,
      examples: [...g.examples, ...g.configExamples].slice(0, 3),
    }))
    .sort((a, b) => b.count - a.count);

  if (opts.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log('项目: ' + result.project);
  console.log('类型: ' + result.type);
  console.log('扫描文件: ' + result.scannedFiles);
  if (result.configFiles.length) console.log('配置文件: ' + result.configFiles.join(', '));
  if (result.pageCount) {
    console.log('页面线索(' + result.pageCount + '): ' + result.pagePaths.slice(0, 20).join(', '));
  }
  if (result.titles.length) console.log('页面标题: ' + result.titles.join(' / '));
  if (result.deps.length) console.log('依赖线索: ' + result.deps.join(', '));

  if (!result.groups.length) {
    console.log('\n未命中任何功能信号。请直接阅读页面配置与主要业务代码。');
    return;
  }

  console.log('\n功能线索（按命中次数排序，仅列前 ' + opts.limit + ' 组）:');
  for (const group of result.groups.slice(0, opts.limit)) {
    console.log(`\n- ${group.label}（命中 ${group.count} 次 / ${group.fileCount} 个文件）`);
    console.log('  候选类目: ' + group.hints.join('；'));
    console.log('  示例: ' + group.examples.join(', '));
  }
  console.log('\n提示: 关键词仅用于定位，需阅读示例代码确认业务实质；类目与资质以微信公众平台提交页面为准。');
}

main();
