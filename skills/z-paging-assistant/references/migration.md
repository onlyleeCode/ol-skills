# z-paging TypeScript 与 Vue3 迁移

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [TypeScript 支持（v2.7.8+）](#typescript-支持v278)
  - [v2.8.1+（推荐）](#v281推荐)
  - [v2.8.0 及之前（已废弃）](#v280-及之前已废弃)
- [从 Vue2 迁移到 Vue3](#从-vue2-迁移到-vue3)
  - [必须适配部分](#必须适配部分)
  - [可选适配](#可选适配)
  - [z-paging 本身无需额外配置](#z-paging-本身无需额外配置)

## TypeScript 支持（v2.7.8+）

### v2.8.1+（推荐）

**tsconfig.json 配置：**

```json
{
  "compilerOptions": {
    "types": ["@dcloudio/types", "z-paging/types"]
  }
}
```

**使用方式：**

```ts
<script setup lang="ts">
import { ref } from 'vue'
const paging = ref<ZPagingRef<any> | null>(null);
const queryList = (pageNo: number | string, pageSize: number | string, from: ZPagingEnums.QueryFrom) => {
  paging.value?.complete([]);
}
</script>
```

### v2.8.0 及之前（已废弃）

```json
{
  "compilerOptions": {
    "types": ["@dcloudio/types", "z-paging/global.d.ts"]
  }
}
```

```ts
const paging = ref<ZPagingInstance<any> | null>(null);
const queryList: ZPagingEvent.Query = (pageNo: number, pageSize: number) => {
  paging.value?.complete([]);
}
```

***

## 从 Vue2 迁移到 Vue3

### 必须适配部分

1. **slot 写法变更**：`slot="top"` 改为 `v-slot:top` 或 `#top`
2. **slot-scope 写法调整**：`slot-scope="{item}"` 改为 `v-slot="{item}"`
3. **模块导出写法调整**：`export default {}` 可改为 `<script setup>`

### 可选适配

- 支持 Vue3 组合式 API（Composition API）写法，使用 `<script setup>` + `ref`

- 页面滚动模式支持 vue3 + hooks 写法（模仿 mixins 中的代码）

### z-paging 本身无需额外配置

z-paging 同时兼容 vue2 和 vue3，迁移时只需按 uni-app 的 vue3 适配指南调整写法即可。
