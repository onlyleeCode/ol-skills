# z-paging 版本升级指南

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [版本升级指南](#版本升级指南)
  - [查看版本方式](#查看版本方式)
  - [V2.8.1+](#v281)
  - [V2.7.0+](#v270)
  - [V2.6.5+](#v265)
  - [V2.5.1+](#v251)
  - [V2.4.3+](#v243)
  - [V2.4.1+](#v241)
  - [V2.0.5+](#v205)
  - [V1.9.0+](#v190)

## 版本升级指南

### 查看版本方式

1. 查看 `z-paging/z-paging.vue` 文件顶部版本号
2. `console.log(this.$refs.paging.getVersion())`
3. `uni_modules/z-paging/package.json` 的 `version` 字段

### V2.8.1+

- `events` 和 `slots` 中枚举参数由 `number` 改为 `string` 类型

- 涉及：`@query` 的 `from`、`@refresherStatusChange` 的 `status`、`@loadingStatusChange` 的 `status`、`slot="refresher"` 的 `refresherStatus`、`slot="chatLoading"` 的 `loadingMoreStatus`

### V2.7.0+

- 聊天记录模式重构，使用列表倒置方式

- 写法变更：去除 `use-page-scroll` 配置、去除 cell 的 `:id="z-paging-${index}"`、新增 cell 需要 `style="transform: scaleY(-1)"`

- 聊天输入栏新增 `:adjust-position="false"`

### V2.6.5+

- 旧全局配置方式废弃（`z-paging-config.js` 和 `zConfig.setConfig`）

### V2.5.1+

- `end` -> `complete`

- `endByTotalCount/endByTotal/completeByTotalCount` -> `completeByTotal`

- `endByNoMore` -> `completeByNoMore`

- `endByKey` -> `completeByKey`

- `completeByNoMore` 参数2含义反转：true=没有更多数据

### V2.4.3+

- `mounted-auto-call-reload` -> `auto`

- `loading-more-when-no-more-and-inside-of-paging` -> `hide-no-more-inside`

- `hide-loading-more-when-no-more-by-limit` -> `hide-no-more-by-limit`

### V2.4.1+

- i18n 配置与 uni-app 国际化方案对齐

### V2.0.5+

- 内置下拉刷新和加载更多组件内部 view 的 class 和 props 改变

### V1.9.0+

- `fixed` 属性默认值改为 true，z-paging 默认铺满屏幕
