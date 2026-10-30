---
name: "z-paging-assistant"
description: "z-paging 分页组件使用助手，提供 API 参考、配置项、代码示例和常见问题解答。当用户在 uni-app 项目中使用 z-paging、需要实现下拉刷新/上拉加载更多/虚拟列表/聊天记录模式等分页功能时调用。"
---

# z-paging 使用助手

z-paging 是一个基于 uni-app 的高性能分页组件（v2.8.8），支持下拉刷新、上拉加载更多、虚拟列表、聊天记录模式、本地分页、数据缓存等功能，全平台兼容。

## 触发条件

当用户出现以下场景时激活本 Skill：
- 在 uni-app 项目中需要实现分页功能
- 需要下拉刷新 / 上拉加载更多
- 需要虚拟列表 / 长列表优化
- 需要聊天记录模式
- 询问 z-paging 的配置项、事件、方法、插槽
- 遇到 z-paging 相关报错或问题
- 需要将 z-paging 集成到项目中

## 参考文档

完整的 z-paging 参考文档位于：
`z-paging-reference.md`

请优先读取该文档获取详细的 API 配置、代码示例和 FAQ。

## 核心使用模式

### 基本使用

```html
<template>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
        <view class="item" v-for="(item,index) in dataList" :key="index">
            <view class="item-title">{{item.title}}</view>
        </view>
    </z-paging>
</template>

<script>
export default {
    data() {
        return {
            dataList: []
        };
    },
    methods: {
        queryList(pageNo, pageSize) {
            this.$request.queryList({ pageNo, pageSize }).then(res => {
                this.$refs.paging.complete(res.data.list);
            }).catch(res => {
                this.$refs.paging.complete(false);
            })
        }
    },
};
</script>
```

### 组合式 API (Vue3)

```html
<script setup>
import { ref } from 'vue';
const paging = ref(null);
const dataList = ref([]);
const queryList = (pageNo, pageSize) => {
    request.queryList({ pageNo, pageSize }).then(res => {
        paging.value.complete(res.data.list);
    }).catch(res => {
        paging.value.complete(false);
    })
}
</script>
```

### 核心要点

1. `v-model` 绑定的变量**不要**在分页请求中自己赋值
2. `@query` 绑定的方法**不要**自己调用，刷新时调用 `this.$refs.paging.reload()`
3. 请求成功调用 `complete(数组)`，失败调用 `complete(false)`
4. nvue 中列表 item 必须用 `cell` 或 `z-paging-cell` 包裹

## 常用场景速查

| 场景 | 关键配置 |
|------|----------|
| 仅下拉刷新 | `refresher-only` |
| 延迟加载 | `:auto="false"`，获取数据后调用 `reload()` |
| 页面滚动 | `use-page-scroll`（需引入 mixins） |
| 虚拟列表 | `use-virtual-list` + `#cell` slot |
| 聊天模式 | `use-chat-record-mode` |
| 本地分页 | 调用 `setLocalPaging(数组)` |
| 数据缓存 | `use-cache` + `cache-key` |
| 弹窗内使用 | `:fixed="false"` + `height="xxx"` |
| fetch 极简写法 | `:fetch="queryFn"` + `:fetch-params="{...}"` |
| 自定义下拉刷新 | `#refresher` slot |
| 自定义加载更多 | `#loadingMoreLoading` / `#loadingMoreNoMore` slot |
| 自定义空数据图 | `#empty` slot |
| 下拉进入二楼 | `:refresher-f2-enabled="true"` + `#f2` slot |
| 数据一致性(tab切换) | `:data-key="tabIndex"` + `completeByKey(arr, key)` |
| 吸顶效果 | `#top` slot |

## complete 方法选择指南

| 方法 | 适用场景 |
|------|----------|
| `complete(arr)` | 通用，数组长度 < pageSize 时自动判定无更多 |
| `completeByTotal(arr, total)` | 后端返回 total 总数时使用 |
| `completeByNoMore(arr, noMore)` | 自行判断是否没有更多 |
| `completeByKey(arr, dataKey)` | tab 切换时保证数据一致性 |
| `completeByError(reason)` | 请求失败，传入失败原因 |
| `complete(false)` | 请求失败简写 |

## 三种布局模式

| 模式 | 设置 | 适用场景 |
|------|------|----------|
| 固定布局(默认) | `:fixed="true"` | 一般页面列表 |
| 非固定布局 | `:fixed="false"` + 指定高度 | 弹窗内、swiper 内 |
| 页面滚动 | `use-page-scroll` + mixins | 联动导航栏、整页滚动 |

## 常见问题速查

| 问题 | 解决方案 |
|------|----------|
| z-paging 盖住其他 view | 所有 view 放 z-paging 内，固定顶部用 `slot="top"` |
| 无法下拉刷新 | 必须在 @query 中调用 `complete()` |
| 微信小程序列表空白 | `:fixed="false"` 时必须用 `height` 设高度 |
| 数据覆盖不拼接 | 不要给 v-model 赋值，用 `complete(数组)` |
| 多请求一次空数组 | 用 `completeByTotal(arr, total)` 替代 `complete(arr)` |
| queryList 触发两次 | `:auto="false"` 关闭自动触发 |
| 底部看不到加载更多 | 自定义 tabbar 放 `slot="bottom"` |
| 支付宝小程序无法下拉 | pages.json 设 `"mp-alipay": {"allowsBounceVertical": "NO"}` |
| slot=top 内组件被盖住 | `:content-z-index="1"` |
| nvue 列表空白 | 子组件必须用 `cell` 或 `z-paging-cell` |

## 安装方式

### 插件市场
访问 https://ext.dcloud.net.cn/plugin?id=3935 导入

### npm
```bash
npm install z-paging --save
```
npm 安装需在 pages.json 配置 easycom：
```json
"easycom": {
  "custom": {
    "^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)": "z-paging/components/z-paging$1/z-paging$1.vue"
  }
}
```

## 完整文档导航

更详细的 API 参考（Props 100+项、Events 30+项、Slots 20+项、Methods 40+项、FAQ 28条、14个使用场景代码示例）请读取：
`z-paging-reference.md`
