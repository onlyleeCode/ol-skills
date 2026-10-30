# skills

常用 skill 归档目录，每个 skill 一个子目录：

```text
skills/
└── <skill-name>/
    ├── SKILL.md
    └── ...
```

约定：

- 目录名使用 kebab-case，例如 `code-review-helper`。
- `SKILL.md` 首部包含 name、description 等元信息，正文写清触发场景与使用步骤。
- 相关脚本与资源放在 skill 目录内（大文档可放入 `references/` 子目录），保持自包含。
