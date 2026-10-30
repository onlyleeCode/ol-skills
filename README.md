# ol-skills

个人常用 skills 集合，按目录归档，随取随用。

## 目录结构

```text
.
├── README.md                        # 仓库说明与安装方式
└── skills/
    ├── README.md                    # skill 编写约定
    ├── picsum-photos/
    │   └── SKILL.md                 # Picsum 占位图 URL 与 API 用法
    ├── wechat-miniprogram-category-audit/
    │   ├── SKILL.md                 # 入口：审核流程、硬性规则、资源索引
    │   ├── references/
    │   │   ├── categories.json      # 微信服务类目数据（537 条）
    │   │   └── audit-rules.md       # 主体限制、功能映射、报告模板
    │   └── scripts/
    │       ├── scan_project.cjs     # 扫描项目功能线索
    │       ├── lookup.cjs           # 检索类目与资质
    │       └── build_categories.cjs # 重建类目数据
    └── z-paging-assistant/
        ├── SKILL.md                 # 入口：触发条件、核心用法、文档索引
        └── references/              # 完整参考文档，按主题拆分（v2.8.8）
            ├── getting-started.md   # 概述、安装、快速开始、布局模式
            ├── props.md             # Props 配置（16 类）
            ├── events.md            # Events 事件
            ├── slots.md             # Slots 插槽
            ├── methods.md           # Methods 方法
            ├── guides.md            # 常见使用场景示例
            ├── virtual-list.md      # 虚拟列表专章
            ├── chat-record-mode.md  # 聊天记录模式专章
            ├── global-config.md     # 全局配置、拦截器、错误处理
            ├── components.md        # 公用子组件
            ├── migration.md         # TypeScript 与 Vue2→Vue3 迁移
            ├── platforms.md         # uniapp-x、mini 版、i18n、nvue
            ├── upgrade.md           # 版本升级指南
            └── faq.md               # 常见问题
```

每个 skill 一个目录，至少包含带 name / description 元信息的 `SKILL.md`。`SKILL.md` 是入口，承载触发条件、核心用法与文档索引；详细资料放在 skill 目录内，大文档可按主题拆分到 `references/` 子目录，保持自包含。

## 安装

要求 Node.js >= 22.20（skills CLI 的版本要求），低于该版本会报 `fs/promises` 缺少 `glob` 导出的错误。

全局安装全部 skill：

```bash
npx skills add onlyleeCode/ol-skills -g -y
```

只安装指定 skill：

```bash
npx skills add onlyleeCode/ol-skills -g -y --skill picsum-photos
```

项目级安装（在项目目录下执行，去掉 `-g`）：

```bash
npx skills add onlyleeCode/ol-skills -y
```

查看仓库中可安装的 skill：

```bash
npx skills add onlyleeCode/ol-skills --list
```

## 使用方式

1. 通过上面的命令安装，或把 `skills/` 下需要的目录直接拷贝到本地 skills 存放位置（如 `~/.agents/skills/`、`~/.qoder-cn/skills/` 或项目内的 `.qoder/skills/`）。
2. 重启或重新加载后即可在会话中调用。
