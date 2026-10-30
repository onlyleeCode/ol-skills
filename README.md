# ol-skills

个人常用 skills 集合，按目录归档，随取随用。

## 目录结构

```text
skills/
├── picsum-photos/
│   └── SKILL.md              # Picsum 占位图 URL 与 API 用法
└── z-paging-assistant/
    ├── SKILL.md              # z-paging 分页组件用法与 FAQ
    └── z-paging-reference.md # z-paging 完整参考文档（v2.8.8）
```

每个 skill 一个目录，至少包含带 name / description 元信息的 `SKILL.md`，脚本、参考文档等资源与它放在同一目录下。

## 安装

要求 Node.js >= 22.20（skills CLI 的版本要求），低于该版本会报 `fs/promises` 缺少 `glob` 导出的错误。

全局安装全部 skill：

```bash
npx skills add xianyu21/ol-skills -g -y
```

只安装指定 skill：

```bash
npx skills add xianyu21/ol-skills -g -y --skill picsum-photos
```

项目级安装（在项目目录下执行，去掉 `-g`）：

```bash
npx skills add xianyu21/ol-skills -y
```

查看仓库中可安装的 skill：

```bash
npx skills add xianyu21/ol-skills --list
```

## 使用方式

1. 通过上面的命令安装，或把 `skills/` 下需要的目录直接拷贝到本地 skills 存放位置（如 `~/.agents/skills/`、`~/.qoder-cn/skills/` 或项目内的 `.qoder/skills/`）。
2. 重启或重新加载后即可在会话中调用。
