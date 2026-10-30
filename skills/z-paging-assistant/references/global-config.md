# z-paging 全局配置、拦截器与错误处理

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [全局配置 & 拦截器](#全局配置--拦截器)
  - [全局配置（v1.5.8+）](#全局配置v158)
  - [拦截器](#拦截器)
- [全局错误处理](#全局错误处理)

## 全局配置 & 拦截器

### 全局配置（v1.5.8+）

支持统一配置 z-paging 所有属性（非必须），局部配置优先级高于全局配置。

**【方案1】（推荐）v2.6.5+，在 main.js 中配置：**

```js
uni.$zp = {
  config: {
    'default-page-size': 15,
    'empty-view-text': '空空如也~~',
    // ...
  }
}
```

**【方案2】v2.0.4+，在 z-paging/config/index.js 中配置（更新插件时避免被覆盖）：**

```js
module.exports = {
  'default-page-size': 15,
  'empty-view-text': '空空如也~~',
  // ...
}
```

> 若同时配置方案1和方案2，方案2优先级更高

### 拦截器

**全局拦截 @query 参数（v2.2.8+）：**

```js
import ZPInterceptor from '@/uni_modules/z-paging/components/z-paging/js/z-paging-interceptor'
ZPInterceptor.handleQuery((pageNo, pageSize, from, lastItem) => {
  return [pageNo, pageSize, from];
})
```

| 参数                | 说明                                                   | 类型     |
| ----------------- | ---------------------------------------------------- | ------ |
| pageNo            | 当前第几页                                                | Number |
| pageSize          | 每页多少条                                                | Number |
| from              | 触发来源：`user-pull-down`/`reload`/`refresh`/`load-more` | String |
| lastItem（v2.5.8+） | 当前列表最后一项                                             | Object |

**全局拦截 :fetch 请求参数和响应（v2.7.8+）：**

```js
ZPInterceptor.handleFetchParams((params, extraParams) => {
  return { pageNo: params.pageNo, pageSize: params.pageSize, ...extraParams };
}).handleFetchResult((fetchResult, paging) => {
  fetchResult.then(res => {
    paging.complete(res.data.list);
  }).catch(err => {
    paging.complete(false);
  })
})
```

***

## 全局错误处理

```js
// 请求失败时（自动触发 complete(false)）
uni.$emit('z-paging-error-emit', '请求失败原因(可选)');

// 请求成功时（自动触发 complete(结果数组)）
uni.$emit('z-paging-complete-emit', 请求结果数组);
```
