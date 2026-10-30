# z-paging 快速上手

> **版本**: v2.8.8 (2025-08-29)
> **作者**: ZXLee (<admin@zxlee.cn>)
> **协议**: MIT（商用无需授权）
> **文档地址**: <https://z-paging.zxlee.cn>
> **GitHub**: <https://github.com/SmileZXLee/uni-z-paging>
> **插件市场**: <https://ext.dcloud.net.cn/plugin?id=3935>
> **在线Demo**: <https://demo.z-paging.zxlee.cn>

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [概述](#概述)
  - [支持的功能](#支持的功能)
  - [平台兼容性](#平台兼容性)
  - [性能建议](#性能建议)
- [安装](#安装)
  - [方式一：插件市场安装](#方式一插件市场安装)
  - [方式二：npm 安装](#方式二npm-安装)
  - [示例项目下载](#示例项目下载)
  - [教学](#教学)
  - [反馈群](#反馈群)
- [快速开始](#快速开始)
  - [基本使用 — 选项式 API (vue2/3)](#基本使用--选项式-api-vue23)
  - [基本使用 — 组合式 API (vue3)](#基本使用--组合式-api-vue3)
  - [核心要点](#核心要点)
- [三种布局模式详解](#三种布局模式详解)
  - [页面滚动模式 mixins 核心代码](#页面滚动模式-mixins-核心代码)
- [仓库目录说明](#仓库目录说明)

## 概述

z-paging 是一个基于 uni-app 的高性能分页组件，核心特性：

- **配置简单** — 仅需两步完成下拉刷新 + 上拉加载更多，分页全自动管理

- **低耦合低侵入** — 无需处理分页逻辑，无需定义分页变量

- **超灵活** — 支持自定义下拉刷新/加载更多、空数据图、聊天分页、本地分页等数百项配置

- **全平台兼容** — 支持 vue/nvue、vue2/vue3、js/ts、h5/app/鸿蒙Next/各家小程序

- **高性能** — wxs+renderjs 视图层下拉刷新；虚拟列表轻松渲染百万级数据

- **下载超15万次**，插件市场评分 4.8/5.0，迭代 100+ 版本

### 支持的功能

国际化、自定义且自动管理空数据图、主题模式切换、本地分页、聊天分页模式、展示最后更新时间、**吸顶效果**、内部 scroll-view 滚动与页面滚动、一键滚动到顶部、下拉进入二楼、数据缓存、虚拟列表、拦截器等。

### 平台兼容性

| 平台                                                           | 支持情况                                      |
| ------------------------------------------------------------ | ----------------------------------------- |
| Vue2 / Vue3                                                  | 完全支持                                      |
| JS / TS                                                      | 完全支持                                      |
| H5 / App (iOS/Android/鸿蒙Next)                                | 完全支持                                      |
| 微信小程序 / QQ小程序 / 支付宝小程序 / 抖音小程序 / 百度小程序 / 快手小程序 / 飞书小程序 / 京东小程序 | 完全支持 |
| 华为快应用 | 支持（快应用-联盟版暂不支持） |
| nvue                                                         | 完全支持（使用 `<cell />` 或 `<z-paging-cell />`） |

### 性能建议

- 简单列表：使用内置 scroll-view（默认）

- 复杂长列表：开启虚拟列表（`use-virtual-list`）

- App 项目：建议使用 nvue（原生渲染，性能更优）

***

## 安装

### 方式一：插件市场安装

1. 访问 [插件市场](https://ext.dcloud.net.cn/plugin?id=3935)
2. 点击【使用HBuilderX导入插件】
3. 选择目标项目并导入

> 导入后在 `uni_modules` 目录下，遵循 easycom 规范，无需注册即可使用。

**支付宝/钉钉小程序需额外配置** (`pages.json`)：

```json
"mp-alipay": {
  "allowsBounceVertical": "NO"
}
```

### 方式二：npm 安装

```bash
npm init -y
npm install z-paging --save
```

> 更新：`npm update z-paging`

**npm 安装后需在** **`pages.json`** **配置 easycom**：

```json
"easycom": {
  "custom": {
    "^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)": "z-paging/components/z-paging$1/z-paging$1.vue"
  }
}
```

**vue2+cli 需在** **`vue.config.js`** **中添加**：

```js
module.exports = {
  transpileDependencies: ['z-paging']
}
```

### 示例项目下载

- **插件市场下载**：[选项式API写法](https://ext.dcloud.net.cn/plugin?id=3935)，兼容 vue2/vue3，可直接拖到 HBuilderX 中运行

- **GitHub 下载**：<https://github.com/SmileZXLee/uni-z-paging>，包含选项式API（`demo/z-paging-demo`）和组合式API（`demo/z-paging-vue3-demo`）两种写法

- **在线体验**：<https://demo.z-paging.zxlee.cn>

### 教学

- **第三方教学视频**：《开发uniapp项目好用的插件z-paging下拉刷新和触底加载的快速实现》（作者：咸虾米\_）

- **官方视频教程**：z-paging简单使用、滑动切换选项卡实现

### 反馈群

- 官方1群（3000人群，已满）：790460711

- 官方2群（2000人群，已满）：371624008

- 官方3群（2000人群）：343409055

***

## 快速开始

### 基本使用 — 选项式 API (vue2/3)

```html
<template>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
        <!-- z-paging默认铺满全屏，所有view都应放在z-paging标签内 -->
        <!-- 需要固定在页面顶部的view请通过slot="top"插入 -->
        <view class="item" v-for="(item,index) in dataList" :key="index">
            <view class="item-title">{{item.title}}</view>
        </view>
    </z-paging>
</template>

<script>
export default {
    data() {
        return {
            // v-model绑定的变量不要在分页请求中自己赋值，直接使用即可
            dataList: []
        };
    },
    methods: {
        // @query绑定的方法不要自己调用！！需要刷新时调用 this.$refs.paging.reload()
        queryList(pageNo, pageSize) {
            this.$request.queryList({ pageNo, pageSize }).then(res => {
                // 将请求结果通过complete传给z-paging，同时也代表请求结束，这一行必须调用
                this.$refs.paging.complete(res.data.list);
            }).catch(res => {
                // 请求失败写 complete(false)，会自动展示错误页面
                this.$refs.paging.complete(false);
            })
        }
    },
};
</script>
```

### 基本使用 — 组合式 API (vue3)

```html
<template>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
        <view class="item" v-for="(item,index) in dataList" :key="index">
            <view class="item-title">{{item.title}}</view>
        </view>
    </z-paging>
</template>

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

- `v-model` 绑定的变量**不要**在分页请求中自己赋值

- `@query` 绑定的方法**不要**自己调用，需要刷新时调用 `this.$refs.paging.reload()`

- 请求成功调用 `complete(数组)`，失败调用 `complete(false)`

- nvue 中列表 item 必须用 `cell` 包裹

***

## 三种布局模式详解

| 模式           | 设置                                    | 特点                                                                                                            | 适用场景                               |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **固定布局（默认）** | `:fixed="true"`                       | position:fixed，铺满整个页面，脱离文档流，局部滚动。所有元素写在 z-paging 内，固定顶部用 slot="top"，固定底部用 slot="bottom"                       | 一般页面列表分页                           |
| **非固定布局**    | `:fixed="false"`                      | 不再 fixed，但仍是局部滚动（类似 scroll-view），**必须给 z-paging 或父 view 确定高度**（通过 `height` 或 `:paging-style`，不要用 class/style） | 弹窗内部、swiper 内部等局部滚动场景              |
| **页面滚动**     | `:use-page-scroll="true"`（需引入 mixins） | 不再局部滚动，z-paging 相当于普通 view 容器，高度由列表内容决定                                                                       | 下拉刷新需从页面某个 view 下方开始；页面滚动联动导航栏透明度等 |

### 页面滚动模式 mixins 核心代码

```js
export default {
  onPullDownRefresh() {
    this.$refs.paging.reload().catch(() => {});
  },
  onPageScroll(e) {
    this.$refs.paging.updatePageScrollTop(e.scrollTop);
    e.scrollTop < 10 && this.$refs.paging.doChatRecordLoadMore();
  },
  onReachBottom() {
    this.$refs.paging.pageReachBottom();
  }
}
```

***

## 仓库目录说明

```
.
├── demo
│   ├── z-paging-demo           选项式api写法，支持vue2和vue3
│   └── z-paging-vue3-demo      组合式api写法，仅支持vue3
├── z-paging                    z-paging 源码
├── LICENSE
└── README.md
```
