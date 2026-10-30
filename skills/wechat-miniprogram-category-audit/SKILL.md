---
name: wechat-miniprogram-category-audit
description: 审核微信小程序服务类目覆盖情况：根据项目代码或产品描述识别实际业务功能，对照微信开放服务类目（非个人主体/个人主体/境外主体）检查已选类目是否覆盖业务、是否缺少必配类目或资质，输出覆盖矩阵、缺失类目与资质清单。适用于小程序类目选型、上架前类目自查、审核驳回排查、新增功能后的类目复核，涉及电商、教育、医疗、金融、餐饮、旅游、社交、直播、AI 深度合成等场景时使用。
---

# 微信小程序服务类目覆盖审核

## 目标

对一个微信小程序项目做类目自查，输出：

1. 业务功能 → 应选类目的覆盖矩阵；
2. 缺失、未开放或多余的类目；
3. 每个类目需要的资质材料；
4. 关联类目与平台能力提示（直播、虚拟支付、AI 标注等）。

类目名称、资质原文只使用 `references/categories.json` 中的数据，不臆造类目或资质要求。

## 前置信息

| 信息 | 获取方式 | 缺失时的处理 |
| --- | --- | --- |
| 主体类型 | 询问用户：非个人主体 / 个人主体 / 境外主体 | 必须询问；不要默认。用户未回答时可按非个人主体给候选，但报告中标注“主体类型为假设” |
| 已选类目 | 小程序类目配置在微信公众平台后台，不在代码仓库；让用户提供清单或截图 | 报告中写“已选类目未提供”，先输出应选类目与缺口，不猜测现状 |
| 审核范围 | 默认整个项目；用户指定页面/功能时以其为准 | 说明扫描范围 |

## 工作流

命令约定：下文用 `SKILL_DIR` 指代本技能目录。本机用户级安装为 `$HOME/.qoder-cn/skills/wechat-miniprogram-category-audit`；若安装在项目级，则为 `.qoder/skills/wechat-miniprogram-category-audit`。每个新 shell 先设置：

```bash
SKILL_DIR="$HOME/.qoder-cn/skills/wechat-miniprogram-category-audit"
```

### 第 1 步：识别实际业务功能

有代码目录时，先运行功能扫描（monorepo 只扫描含 `pages.json` / `app.json` 的小程序子目录，避免后端与管理端噪声）：

```bash
SKILL_DIR="$HOME/.qoder-cn/skills/wechat-miniprogram-category-audit"
node "$SKILL_DIR/scripts/scan_project.cjs" <项目绝对路径> --limit 15
```

脚本会输出项目类型、页面路径、页面标题、依赖线索与关键词命中的功能分组。随后必须：

- 阅读 `pages.json` / `app.json` 的页面与 tabBar，确认主要业务入口；
- 打开扫描命中的关键页面、接口、云函数，确认业务实质；
- 排除误命中（例如普通预约里的“订单”不等于电商平台）。

每一条进入报告的功能都要有证据：代码用 `文件路径:行号`，产品描述用“用户描述”。没有证据的功能不要写入矩阵。

没有代码时，让用户给出功能清单（谁提供服务、是否多商家、是否收费、是否直播/课程/AI 等），逐条映射。

### 第 2 步：检索候选类目

```bash
SKILL_DIR="$HOME/.qoder-cn/skills/wechat-miniprogram-category-audit"
# 查看三类主体的一级类目与数量
node "$SKILL_DIR/scripts/lookup.cjs" --list

# 按关键词检索（默认三类主体全查，输出截断）
node "$SKILL_DIR/scripts/lookup.cjs" 课程 直播 --entity non-individual

# 最终候选必须加 --full 读取完整资质与“注”
node "$SKILL_DIR/scripts/lookup.cjs" 在线视频课程 --entity non-individual --category 教育服务 --full

# 输出 JSON 供进一步处理
node "$SKILL_DIR/scripts/lookup.cjs" AI 问答 --entity non-individual --json
```

规则：

- 只使用返回结果中存在的类目路径（`一级 > 二级 > 三级`）；不要用近义词自造类目。
- `--full` 输出的“类目适用范围”里常含“需补充【X】”，这些 X 是必选关联类目。
- 目标主体清单里没有对应类目时，结论是“该主体未开放”，不是“无需类目”。

### 第 3 步：逐功能判定

先加载 `references/audit-rules.md`（功能映射表、自营/平台对照、常见驳回原因）。对每个功能：

1. 找覆盖该功能且对目标主体开放的类目；
2. 检查类目范围里的“不包含 / 不支持 / 建议去除”项，项目若存在则需换类目或移除功能；
3. 展开“注”中的必选关联类目；
4. 判断单商家自营还是多商家平台，二者不能互相替代；
5. 列出资质材料，结合主体证照判断“可提供 / 可能缺失 / 无法判断”；
6. 记录证据。

状态只用五种：`已覆盖`、`缺失`、`主体未开放`、`需移除功能`、`待确认`。

### 第 4 步：输出报告

使用 `references/audit-rules.md` 第 6 节的模板，至少包含：

- 主体类型、已选类目来源、数据快照日期；
- 覆盖矩阵（业务功能 / 证据 / 应选类目 / 当前状态 / 需补资质）；
- 必须新增的类目（按优先级）；
- 已选但未覆盖或多出的类目；
- 关联类目与平台能力；
- 无法判定项；
- 免责声明（以提交时微信公众平台要求为准）。

报告只列相关类目，不要把 `categories.json` 全量贴出。

## 硬性规则

- **主体类型优先**：个人主体仅开放 8 个一级类目，电商、直播、社区、医疗、金融、招聘等均不可用；个人教育仅信息展示，餐饮仅餐厅排队，旅游仅出境WiFi。境外主体使用独立类目清单，`教育 > 在线教育` 仅信息展示。详见 `references/audit-rules.md` 第 1 节。
- **自营 ≠ 平台**：多商家入驻、多机构课程、多商家外卖必须申请平台类目（如 `电商平台 > 电商平台`、`教育服务 > 课程销售平台` / `教育平台`、`餐饮服务 > 外卖平台`），仅选商家自营是高频驳回原因。
- **课程 ≠ 课程销售**：有网课、录播、直播授课时，除课程销售类目外必须补 `在线视频课程` 或 `其他在线视频课程`。
- **直播要拆类型**：非表演类用 `社交 > 直播`，表演类用 `社交 > 直播表演`；时政直播补 `时政信息`；首次代码审核约 7 天。
- **AI 要合规**：AI 问答/绘画/换脸/创作/拟人化互动需 `深度合成` 类目、算法备案（生成合成类），使用第三方技术需合作协议，AI 生成内容需显著标注。
- **强资质行业**：医疗、药品、医疗器械、金融、招聘等必须有对应许可证；无法取得时建议移除功能，不要写成“补充说明即可”。
- **资质不假设**：不确定主体是否具备某证照时标为 `待确认`，不要用“应该具备”“一般都有”下结论。
- **数据时效**：报告注明 `categories.json` 的快照日期，并提示最终以提交页面要求为准。

## 快速示例

输入：uni-app 项目，含课程详情、直播课堂、商城下单、AI 问答、社区帖子。

```bash
SKILL_DIR="$HOME/.qoder-cn/skills/wechat-miniprogram-category-audit"
node "$SKILL_DIR/scripts/scan_project.cjs" "D:/projects/demo" --limit 10
node "$SKILL_DIR/scripts/lookup.cjs" 在线视频课程 课程销售 --entity non-individual --category 教育服务 --full
node "$SKILL_DIR/scripts/lookup.cjs" 直播 --entity non-individual --category 社交 --full
node "$SKILL_DIR/scripts/lookup.cjs" 深度合成 --entity non-individual --full
```

输出要点：教育服务（在线视频课程 + 课程销售）、社交（直播）、商品销售对应商家自营或电商平台、深度合成（AI 问答），并列出办学许可、视听许可、算法备案等材料。

## 资源

| 文件 | 用途 |
| --- | --- |
| `references/categories.json` | 537 条类目数据：非个人 391、个人 36、境外 110 |
| `references/audit-rules.md` | 主体限制、自营/平台对照、功能映射、关联规则、报告模板 |
| `scripts/scan_project.cjs` | 扫描项目功能线索（支持 `--json`、`--limit`、`--max-files`） |
| `scripts/lookup.cjs` | 检索类目与资质（支持 `--entity`、`--category`、`--full`、`--list`、`--json`） |
| `scripts/build_categories.cjs` | 从新版类目文档重建数据 |

数据更新：

```bash
SKILL_DIR="$HOME/.qoder-cn/skills/wechat-miniprogram-category-audit"
node "$SKILL_DIR/scripts/build_categories.cjs" <新的类目文档.md>
```

脚本会打印三类主体条目数与解析异常数；更新后确认 `meta.generatedAt` 变化。
