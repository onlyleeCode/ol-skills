# z-paging 完整参考文档

> **版本**: v2.8.8 (2025-08-29)
> **作者**: ZXLee (<admin@zxlee.cn>)
> **协议**: MIT（商用无需授权）
> **文档地址**: <https://z-paging.zxlee.cn>
> **GitHub**: <https://github.com/SmileZXLee/uni-z-paging>
> **插件市场**: <https://ext.dcloud.net.cn/plugin?id=3935>
> **在线Demo**: <https://demo.z-paging.zxlee.cn>

***

## 目录

- [概述](#概述)

- [安装](#安装)

  - [示例项目下载](#示例项目下载)

  - [教学](#教学)

  - [反馈群](#反馈群)

- [快速开始](#快速开始)

- [三种布局模式详解](#三种布局模式详解)

- [Props 配置](#props-配置)

  - [数据&布局](#一数据布局配置)

  - [reload相关](#二reload相关配置)

  - [下拉刷新](#三下拉刷新配置)

  - [底部加载更多](#四底部加载更多配置)

  - [空数据与加载失败图](#五空数据与加载失败图配置)

  - [全屏Loading](#六全屏loading配置)

  - [返回顶部按钮](#七返回顶部按钮配置)

  - [虚拟列表&内置列表](#八虚拟列表内置列表配置)

  - [本地分页](#九本地分页配置)

  - [聊天记录模式](#十聊天记录模式配置)

  - [scroll-view&滚动](#十一scroll-view滚动相关配置)

  - [nvue独有](#十二nvue独有配置)

  - [i18n国际化](#十三i18n国际化配置)

  - [缓存](#十四缓存配置)

  - [z-index](#十五z-index配置)

  - [其他](#十六其他配置)

- [Events 事件](#events-事件)

- [Slots 插槽](#slots-插槽)

- [Methods 方法](#methods-方法)

- [虚拟列表](#虚拟列表)

- [聊天记录模式](#聊天记录模式)

- [全局配置 & 拦截器](#全局配置--拦截器)

- [公用子组件](#公用子组件)

- [TypeScript 支持](#typescript-支持v278)

- [从 Vue2 迁移到 Vue3](#从-vue2-迁移到-vue3)

- [uniapp-x 版](#uniapp-x-版)

- \[mini 版]\(#mini 版)

- [i18n 国际化](#i18n-国际化v165)

- [nvue 模块](#nvue-模块)

- [版本升级指南](#版本升级指南)

- [全局错误处理](#全局错误处理)

- [常见问题 FAQ（28条）](#常见问题-faq28条)

- [常见使用场景](#常见使用场景)

  - [仅使用下拉刷新](#仅使用下拉刷新)

  - [延迟加载列表](#延迟加载列表先获取-tabs-再加载列表)

  - [使用页面滚动](#使用页面滚动)

  - [虚拟列表](#虚拟列表内置列表写法)

  - [使用 fetch 极简写法](#使用-fetch-极简写法-v278)

  - [本地分页](#本地分页)

  - [数据缓存](#数据缓存)

  - [自定义下拉刷新](#自定义下拉刷新)

  - [自定义加载更多](#自定义加载更多)

  - [自定义空数据图](#自定义空数据图)

  - [在弹窗中使用](#在弹窗中使用非固定布局)

  - [下拉进入二楼](#下拉进入二楼)

  - [数据一致性](#数据一致性tab-切换场景)

  - [吸顶效果](#吸顶效果slottop)

***

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

## Props 配置

### 一、数据&布局配置

| 参数                            | 说明                                   | 类型                   | 默认值   |
| ----------------------------- | ------------------------------------ | -------------------- | ----- |
| v-model                       | 绑定最终的列表渲染变量                          | Array                | -     |
| default-page-no               | 自定义初始 pageNo                         | Number               | 1     |
| default-page-size             | 自定义 pageSize（必须和后端一致）                | Number               | 10    |
| fixed                         | 是否使用 fixed 布局（铺满屏幕）                  | Boolean              | true  |
| layout-only V2.8.7            | 是否只使用基础布局                            | Boolean              | false |
| safe-area-inset-bottom        | 是否开启底部安全区域适配                         | Boolean              | false |
| use-safe-area-placeholder     | 底部安全区域使用 placeholder 形式              | Boolean              | false |
| use-page-scroll               | 使用页面滚动                               | Boolean              | false |
| auto-full-height              | 页面滚动不满屏时自动填满                         | Boolean              | true  |
| default-theme-style           | loading 主题样式                         | String               | black |
| paging-style                  | z-paging 的 style                     | Object               | -     |
| paging-class V2.8.7           | z-paging 的 class（优先级低于 paging-style） | String/Array/Object  | -     |
| paging-content-style          | z-paging 容器（插槽父 view）的 style       | Object               | {}    |
| paging-content-class          | z-paging 容器（插槽父 view）的 class       | String               | ""    |
| height                        | z-paging 的高度                         | String               | -     |
| width                         | z-paging 的宽度                         | String               | -     |
| max-width                     | z-paging 的最大宽度                       | String               | -     |
| bg-color                      | z-paging 的背景色（支持渐变、背景图）              | String               | -     |
| bottom-bg-color               | bottom 的背景色                          | String               | -     |
| watch-touch-direction-change  | 监听列表触摸方向改变                           | Boolean              | false |
| watch-scroll-direction-change | 监听列表滚动方向改变                           | Boolean              | false |
| delay                         | 调用 complete 后延迟处理时间(ms)              | Number/String        | 0     |
| min-delay                     | 触发 @query 后最小延迟时间(ms)                | Number/String        | 0     |
| call-network-reject           | 请求失败是否触发 reject                      | Boolean              | true  |
| unit                          | 默认布局的单位                              | String               | rpx   |
| concat                        | 自动拼接 complete 传过来的数组（聊天模式无效）         | Boolean              | true  |
| data-key                      | 当前 tab 切换时的标识 key                    | Number/String/Object | -     |
| autowire-list-name            | 【极简写法】自动注入的 list 名                   | String               | ""    |
| autowire-query-name           | 【极简写法】自动注入的 query 名                  | String               | ""    |
| fetch                         | 获取分页数据 Function，设置后 @query 不再触发      | Function             | null  |
| fetch-params                  | fetch 的附加参数                          | Object               | null  |
| list.sync                     | 绑定列表渲染变量（建议用 v-model）                | Array                | -     |
| refresher-status.sync         | 绑定下拉刷新状态                             | Number               | -     |
| virtual-list.sync             | 虚拟列表当前渲染数组                           | Array                | -     |

> 注：2.8.8 changelog 中的 `in-swiper-slot` / `virtual-in-swiper-slot` 在当前源码中实际属性为 `parent-level` / `virtual-parent-level`，见「八、虚拟列表&内置列表配置」和「十一、scroll-view&滚动相关配置」。

### 二、reload相关配置

| 参数                             | 说明                      | 类型      | 默认值   |
| ------------------------------ | ----------------------- | ------- | ----- |
| auto                           | mounted 后自动调用 reload    | Boolean | true  |
| auto-scroll-to-top-when-reload | reload 时自动滚动到顶部         | Boolean | true  |
| auto-clean-list-when-reload    | reload 时立即清空原 list      | Boolean | true  |
| auto-clean-list-when-reload-error | reload 失败时立即清空原 list | Boolean | true |
| show-refresher-when-reload     | 列表刷新时显示下拉刷新 view        | Boolean | false |
| show-loading-more-when-reload  | 列表刷新时显示加载更多 view        | Boolean | false |
| created-reload                 | 组件 created 时立即触发 reload | Boolean | false |

### 三、下拉刷新配置

| 参数                                      | 说明                   | 类型            | 默认值       |
| --------------------------------------- | -------------------- | ------------- | --------- |
| refresher-enabled                       | 是否开启下拉刷新             | Boolean       | true      |
| refresher-threshold                     | 自定义下拉刷新阈值            | Number/String | 80rpx     |
| use-refresher-status-bar-placeholder    | 开启下拉刷新状态栏占位          | Boolean       | false     |
| refresher-only                          | 是否只使用下拉刷新            | Boolean       | false     |
| use-custom-refresher                    | 是否使用自定义下拉刷新          | Boolean       | true      |
| reload-when-refresh                     | 用户下拉刷新时是否触发 reload   | Boolean       | true      |
| refresher-theme-style                   | 下拉刷新主题样式             | String        | black     |
| refresher-img-style                     | 左侧图标样式               | Object        | {}        |
| refresher-title-style                   | 右侧状态描述文字样式           | Object        | {}        |
| refresher-update-time-style             | 最后更新时间文字样式           | Object        | {}        |
| watch-refresher-touchmove               | 实时监听下拉刷新进度           | Boolean       | false     |
| show-refresher-update-time              | 显示最后更新时间             | Boolean       | false     |
| refresher-update-time-key               | 区分不同页面的更新时间 key      | String        | default   |
| refresher-default-text                  | "默认"状态文字（支持i18n）     | String/Object | 继续下拉刷新    |
| refresher-pulling-text                  | "松手立即刷新"文字           | String/Object | 松开立即刷新    |
| refresher-refreshing-text               | "刷新中"文字              | String/Object | 正在刷新...   |
| refresher-complete-text                 | "刷新结束"文字             | String/Object | 刷新成功      |
| refresher-default-img                   | "默认"状态图片             | String        | -         |
| refresher-pulling-img                   | "松手刷新"状态图片           | String        | -         |
| refresher-refreshing-img                | "刷新中"状态图片            | String        | -         |
| refresher-complete-img                  | "刷新结束"状态图片           | String        | -         |
| refresher-refreshing-animated           | 刷新中是否展示旋转动画          | Boolean       | true      |
| refresher-end-bounce-enabled            | 刷新结束回弹动画             | Boolean       | true      |
| refresher-default-style                 | 系统下拉刷新默认样式           | String        | black     |
| refresher-background                    | 下拉刷新区域背景颜色           | String        | #FFFFFF00 |
| refresher-fixed-background              | 固定的下拉刷新区域背景颜色        | String        | #FFFFFF00 |
| refresher-fixed-bac-height              | 固定的下拉刷新区域高度          | Number/String | 0         |
| refresher-default-duration              | 默认状态回弹动画时间(ms)       | Number/String | 100       |
| refresher-complete-delay                | 刷新结束延迟收回时间(ms)       | Number/String | 0         |
| refresher-complete-duration             | 刷新结束收回动画时间(ms)       | Number/String | 300       |
| refresher-vibrate                       | 到"松手刷新"状态时是否短振动      | Boolean       | false     |
| refresher-refreshing-scrollable         | 刷新中是否允许列表滚动          | Boolean       | true      |
| refresher-complete-scrollable           | 刷新结束是否允许列表滚动         | Boolean       | false     |
| refresher-out-rate                      | 超出阈值后继续下拉位移衰减比例(0-1) | Number        | 0.65      |
| refresher-f2-enabled                    | 是否开启下拉进入二楼           | Boolean       | false     |
| refresher-f2-threshold                  | 下拉进入二楼阈值             | Number/String | 200rpx    |
| refresher-f2-duration                   | 下拉进入二楼动画时间(ms)       | Number/String | 200       |
| show-refresher-f2                       | 松手后是否弹出二楼            | Boolean       | true      |
| refresher-go-f2-text                    | 进入二楼状态文字（支持i18n）      | String/Object | 松手进入二楼    |
| refresher-pull-rate                     | 实际下拉位移与用户下拉距离比值      | Number        | 0.75      |
| refresher-fps                           | 自定义下拉刷新帧率            | Number/String | 40        |
| refresher-max-angle                     | 允许触发的最大下拉角度(度)       | Number/String | 40        |
| refresher-angle-enable-change-continued | 角度达标时是否继续手势          | Boolean       | false     |
| refresher-no-transform                  | 下拉时是否禁止 view 跟随触摸移动  | Boolean       | false     |

### 四、底部加载更多配置

| 参数                                     | 说明                    | 类型            | 默认值         |
| -------------------------------------- | --------------------- | ------------- | ----------- |
| loading-more-enabled                   | 是否启用加载更多              | Boolean       | true        |
| lower-threshold                        | 距底部多远触发 scrolltolower | Number/String | 100rpx      |
| to-bottom-loading-more-enabled         | 滑动到底部是否加载更多           | Boolean       | true        |
| loading-more-theme-style               | 底部加载更多主题样式            | String        | black       |
| loading-more-custom-style              | 自定义底部加载更多样式           | Object        | -           |
| loading-more-title-custom-style        | 自定义文字样式               | -             | -           |
| loading-more-loading-icon-custom-style | 自定义加载中动画样式            | Object        | -           |
| loading-more-loading-icon-type         | 加载中图标类型               | String        | flower      |
| loading-more-loading-icon-custom-image | 自定义加载中图标图片            | String        | -           |
| loading-more-loading-animated          | 加载中是否展示旋转动画           | Boolean       | true        |
| loading-more-default-text              | "默认"文字（支持i18n）        | String/Object | 点击加载更多      |
| loading-more-loading-text              | "加载中"文字（支持i18n）       | String/Object | 正在加载...     |
| loading-more-no-more-text              | "没有更多"文字（支持i18n）      | String/Object | 没有更多了       |
| loading-more-fail-text                 | "加载失败"文字（支持i18n）      | String/Object | 加载失败，点击重新加载 |
| hide-no-more-inside                    | 没有更多且内容未超出时隐藏 view    | Boolean       | false       |
| hide-no-more-by-limit                  | 没有更多且数组长度少于此值时隐藏      | Number        | 0           |
| inside-more                            | 分页未满一屏时是否自动加载更多       | Boolean       | false       |
| loading-more-default-as-loading        | 默认状态以加载中展示            | Boolean       | false       |
| show-loading-more-no-more-view         | 显示没有更多数据的 view        | Boolean       | true        |
| show-default-loading-more-text         | 显示默认加载更多 text         | Boolean       | true        |
| show-loading-more-no-more-line         | 显示没有更多数据分割线           | Boolean       | true        |
| loading-more-no-more-line-custom-style | 分割线样式                 | Object        | -           |

### 五、空数据与加载失败图配置

| 参数                                | 说明                 | 类型            | 默认值      |
| --------------------------------- | ------------------ | ------------- | -------- |
| hide-empty-view                   | 强制隐藏空数据图           | Boolean       | false    |
| empty-view-fixed                  | 空数据图铺满整个 z-paging  | Boolean       | false    |
| empty-view-center                 | 空数据图垂直居中           | Boolean       | true     |
| empty-view-text                   | 空数据图描述文字（支持i18n）   | String/Object | 没有数据哦\~  |
| empty-view-img                    | 空数据图图片             | String        | -        |
| empty-view-error-img              | "加载失败"图片           | String        | -        |
| empty-view-reload-text            | 点击重新加载文字（支持i18n）   | String/Object | 重新加载     |
| empty-view-error-text             | "加载失败"描述文字（支持i18n） | String/Object | 很抱歉，加载失败 |
| empty-view-super-style            | 空数据图父 view 样式      | Object        | {}       |
| empty-view-style                  | 空数据图样式             | Object        | {}       |
| empty-view-img-style              | 空数据图 img 样式        | Object        | {}       |
| empty-view-title-style            | 描述文字样式             | Object        | {}       |
| empty-view-reload-style           | 重新加载按钮样式           | Object        | {}       |
| show-empty-view-reload            | 无数据时显示重新加载按钮       | Boolean       | false    |
| show-empty-view-reload-when-error | 加载失败时显示重新加载按钮      | Boolean       | true     |
| auto-hide-empty-view-when-loading | 加载中自动隐藏空数据图        | Boolean       | true     |
| auto-hide-empty-view-when-pull    | 下拉刷新中自动隐藏空数据图      | Boolean       | true     |

### 六、全屏Loading配置

| 参数                                   | 说明                              | 类型            | 默认值    |
| ------------------------------------ | ------------------------------- | ------------- | ------ |
| auto-hide-loading-after-first-loaded | 第一次加载后自动隐藏 loading slot         | Boolean       | true   |
| loading-full-fixed                   | loading slot 父 view 铺满屏幕并固定     | Boolean       | false  |
| auto-show-system-loading             | 自动显示系统 Loading(uni.showLoading) | Boolean       | false  |
| system-loading-text                  | 系统 Loading 文字（支持i18n）           | String/Object | 加载中... |
| system-loading-mask                  | 系统 Loading 是否显示蒙层               | Boolean       | true   |

### 七、返回顶部按钮配置

| 参数                       | 说明            | 类型            | 默认值        |
| ------------------------ | ------------- | ------------- | ---------- |
| auto-show-back-to-top    | 自动显示返回顶部按钮    | Boolean       | false      |
| back-to-top-threshold    | 显示/隐藏阈值(滚动距离) | Number/String | 400rpx     |
| back-to-top-img          | 自定义图片地址       | String        | z-paging内置 |
| back-to-top-with-animate | 返回顶部过渡动画      | Boolean       | true       |
| back-to-top-bottom       | 与底部距离         | Number/String | 160rpx     |
| back-to-top-style        | 自定义样式         | Object        | {}         |

### 八、虚拟列表&内置列表配置

| 参数                     | 说明                        | 类型            | 默认值   |
| ---------------------- | ------------------------- | ------------- | ----- |
| use-virtual-list       | 是否使用虚拟列表                  | Boolean       | false |
| use-compatibility-mode | 使用兼容模式（微信小程序推荐）           | Boolean       | false |
| extra-data             | 使用兼容模式时传递的附加数据 | Object        | {}    |
| cell-height-mode       | cell高度模式：fixed/dynamic    | String        | fixed |
| preload-page           | 预加载可视范围页数                 | Number/String | 12    |
| fixed-cell-height      | 固定 cell 高度（fixed模式）       | Number/String | 0     |
| virtual-list-col       | 虚拟列表列数（仅fixed模式）          | Number/String | 1     |
| virtual-scroll-fps     | scroll 取样帧率               | Number/String | 80    |
| use-inner-list         | 内部循环渲染列表(内置列表)            | Boolean       | false |
| force-close-inner-list | 强制关闭 inner-list           | Boolean       | false |
| virtual-parent-level   | 虚拟列表父组件层级（vue3+ 微信/QQ 小程序，swiper-item 内设为 1） | Number/String | 0 |
| virtual-cell-id-prefix | 虚拟列表 cell id 前缀（区分同页多个虚拟列表） | String | "" |
| cell-key-name          | 内置列表 cell 的 key 名称（仅nvue） | String        | ""    |
| inner-list-style       | innerList 样式              | Object        | {}    |
| inner-cell-style       | innerCell 样式              | Object        | {}    |

### 九、本地分页配置

| 参数                        | 说明           | 类型            | 默认值 |
| ------------------------- | ------------ | ------------- | --- |
| local-paging-loading-time | 本地分页加载延迟(ms) | Number/String | 200 |

### 十、聊天记录模式配置

| 参数                                   | 说明                     | 类型      | 默认值   |
| ------------------------------------ | ---------------------- | ------- | ----- |
| use-chat-record-mode                 | 使用聊天记录模式               | Boolean | false |
| auto-hide-keyboard-when-chat         | 触摸列表自动隐藏键盘             | Boolean | true  |
| auto-adjust-position-when-chat       | 键盘弹出自动调整 bottom 高度     | Boolean | true  |
| auto-to-bottom-when-chat             | 键盘弹出自动滚动到底部            | Boolean | false |
| chat-adjust-position-offset          | 键盘弹出占位高度偏移             | String  | 0rpx  |
| chat-record-more-offset              | 聊天模式滚到顶部后的垂直偏移         | String  | 0rpx  |
| show-chat-loading-when-reload        | reload 时显示 chatLoading | Boolean | false |
| chat-loading-more-default-as-loading | 滑到顶部默认以加载中展示           | Boolean | true  |

### 十一、scroll-view&滚动相关配置

| 参数                              | 说明                   | 类型      | 默认值   |
| ------------------------------- | -------------------- | ------- | ----- |
| show-scrollbar                  | 控制是否出现滚动条            | Boolean | true  |
| scrollable                      | 是否可以滚动               | Boolean | true  |
| scroll-x                        | 是否允许横向滚动             | Boolean | false |
| scroll-to-top-bounce-enabled    | 滚动到顶部回弹效果            | Boolean | false |
| scroll-to-bottom-bounce-enabled | 滚动到底部回弹效果            | Boolean | true  |
| scroll-with-animation           | 滚动条位置使用动画过渡          | Boolean | false |
| scroll-into-view                | 滚动到指定子元素 id          | String  | -     |
| parent-level                    | 父组件层级（vue3+ 微信/QQ 小程序，swiper-item 内设为 1，嵌套更深依次递增） | Number/String | 0 |
| enable-back-to-top              | iOS点击状态栏/安卓双击标题栏返回顶部 | Boolean | true  |

### 十二、nvue独有配置

| 参数                    | 说明                           | 类型      | 默认值   |
| --------------------- | ---------------------------- | ------- | ----- |
| nvue-list-is          | 列表类型：list/waterfall/scroller | String  | list  |
| nvue-waterfall-config | waterfall 配置                 | Object  | -     |
| nvue-bounce           | 控制是否回弹效果                     | Boolean | true  |
| nvue-refresher-style  | refresh 组件样式                 | Object  | {}    |
| nvue-fast-scroll      | 代码滚动到顶/底时加快动画                | Boolean | false |
| nvue-list-id          | list 的 id                    | String  | ""    |
| hide-nvue-bottom-tag  | 隐藏列表底部 tagView               | Boolean | false |
| nvue-paging-enabled   | 按分页模式显示 List                 | Boolean | false |
| offset-accuracy       | onscroll 事件触发频率(px)          | Number  | 10    |

### 十三、i18n国际化配置

| 参数                     | 说明                  | 类型      | 默认值  |
| ---------------------- | ------------------- | ------- | ---- |
| follow-system-language | 跟随系统语言（V2.4.1起废弃）   | Boolean | true |
| language               | 单独设置页面语言（V2.4.1起废弃） | String  | -    |

### 十四、缓存配置

| 参数         | 说明                     | 类型      | 默认值     |
| ---------- | ---------------------- | ------- | ------- |
| use-cache  | 是否使用缓存（必须设置 cache-key） | Boolean | false   |
| cache-key  | 缓存 key，区分不同列表          | String  | null    |
| cache-mode | 缓存模式：default/always    | String  | default |

### 十五、z-index配置

| 参数                    | 说明                          | 类型     | 默认值 |
| --------------------- | --------------------------- | ------ | --- |
| top-z-index           | slot="top" 的 z-index（仅页面滚动） | Number | 99  |
| super-content-z-index | 内容容器父 view 的 z-index        | Number | 1   |
| content-z-index       | 内容容器 z-index                | Number | 1   |
| f2-z-index            | 二楼（f2）的 z-index             | Number | 100 |
| empty-view-z-index    | 空数据 view 的 z-index          | Number | 9   |

### 十六、其他配置

| 参数                   | 说明                          | 类型            | 默认值   |
| -------------------- | --------------------------- | ------------- | ----- |
| auto-height          | z-paging 自动高度（建议用 fixed 代替） | Boolean       | false |
| auto-height-addition | 自动高度附加高度（建议用 fixed 代替）      | Number/String | 0px   |

***

## Events 事件

### 数据处理相关

| 事件名         | 说明             | 回调参数                                                                                                |
| ----------- | -------------- | --------------------------------------------------------------------------------------------------- |
| @query      | 下拉刷新或滚动到底部自动触发 | 参数1: pageNo, 参数2: pageSize, 参数3(from V2.1.4): from(`user-pull-down`/`reload`/`refresh`/`load-more`) |
| @listChange | 分页渲染数组改变时触发    | 最终的分页数据数组                                                                                           |

### 下拉刷新相关

| 事件名                       | 说明           | 回调参数                                                        |
| ------------------------- | ------------ | ----------------------------------------------------------- |
| @refresherStatusChange    | 自定义下拉刷新状态改变  | `default`/`release-to-refresh`/`loading`/`complete`/`go-f2` |
| @refresherTouchstart      | 下拉开始(nvue无效) | 触摸开始的y值(px)                                                 |
| @refresherTouchmove       | 下拉拖动中        | `{pullingDistance, dy, viewHeight, rate}`                   |
| @refresherTouchend        | 下拉结束(nvue无效) | 分页内容下移的y值(px)                                               |
| @refresherF2Change V2.7.7 | 下拉进入二楼状态改变   | `go-`/`close-`                                              |
| @onRefresh                | 下拉刷新被触发      | -                                                           |
| @onRestore                | 下拉刷新被复位      | -                                                           |

### 底部加载更多相关

| 事件名                  | 说明         | 回调参数                                 |
| -------------------- | ---------- | ------------------------------------ |
| @loadingStatusChange | 底部加载更多状态改变 | `default`/`loading`/`no-more`/`fail` |

### 空数据与加载失败相关

| 事件名                        | 说明           | 回调参数                   |
| -------------------------- | ------------ | ---------------------- |
| @emptyViewReload V1.8.0    | 点击空数据图重新加载按钮 | 回调 e(false) 可禁止 reload |
| @emptyViewClick V2.3.3     | 点击空数据图 view  | -                      |
| @isLoadFailedChange V2.5.0 | 请求失败状态改变     | boolean                |

### 返回顶部按钮相关

| 事件名                    | 说明       | 回调参数              |
| ---------------------- | -------- | ----------------- |
| @backToTopClick V2.6.1 | 点击返回顶部按钮 | 回调 e(false) 可禁止滚动 |

### 虚拟列表相关

| 事件名                                  | 说明                 | 回调参数        |
| ------------------------------------ | ------------------ | ----------- |
| @virtualListChange V2.2.7            | 虚拟列表渲染数组改变(nvue无效) | 虚拟列表当前渲染数组  |
| @innerCellClick V2.4.0               | 点击 cell(nvue无效)    | item, index |
| @virtualTopHeightChange              | 虚拟列表顶部占位高度改变       | 高度(px)      |

### 聊天记录模式相关

| 事件名                          | 说明               | 回调参数          |
| ---------------------------- | ---------------- | ------------- |
| @hidedKeyboard V2.3.6        | 触摸列表隐藏键盘(nvue无效) | -             |
| @keyboardHeightChange V2.7.1 | 键盘高度改变           | `{height: 0}` |
| @cellStyleChange             | 聊天记录模式列表倒置样式改变   | 样式对象          |

### 滚动相关

| 事件名               | 说明              | 回调参数                                                                 |
| ----------------- | --------------- | -------------------------------------------------------------------- |
| @scroll           | 列表滚动时触发         | `{scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}` |
| @scrollTopChange  | scrollTop 改变时触发 | scrollTop                                                            |
| @scrolltolower    | 滚动到底部           | -                                                                    |
| @scrolltoupper    | 滚动到顶部           | -                                                                    |
| @scrollend V2.7.3 | 滚动结束(仅nvue)     | `{contentSize, contentOffset, isDragging}`                           |

### 布局&交互相关

| 事件名                           | 说明                                             | 回调参数           |
| ----------------------------- | ---------------------------------------------- | -------------- |
| @contentHeightChanged V2.1.3  | 内容高度改变                                         | 改变后的高度         |
| @touchDirectionChange V2.3.0  | 触摸方向改变(需:watch-touch-direction-change="true")  | `top`/`bottom` |
| @scrollDirectionChange V2.8.7 | 滚动方向改变(需:watch-scroll-direction-change="true") | `top`/`bottom` |

***

## Slots 插槽

> **注意**: slot 插入的 view 必须是 z-paging 的直接子 view。slot 节点不支持 v-if/v-show，将 v-if 加在子节点上。

### 主体布局

| 名称            | 说明                                                                              |
| ------------- | ------------------------------------------------------------------------------- |
| top V1.5.5    | 固定在顶部的 view（导航栏、tab等），勿设 position:fixed。动态高度变化后调用 `updatePageScrollTopHeight()` |
| bottom V1.6.2 | 固定在底部的 view，动态高度变化后调用 `updatePageScrollBottomHeight()`                          |
| left V2.2.3   | 固定在左侧的 view，宽度变化后调用 `updateLeftAndRightWidth()`                                 |
| right V2.2.3  | 固定在右侧的 view                                                                     |

### 下拉刷新

| 名称                       | 说明                                                                 |
| ------------------------ | ------------------------------------------------------------------ |
| refresher                | 自定义下拉刷新 view，style 必须设 height:100%。slot-scope: `{refresherStatus}` |
| refresherComplete V2.1.1 | 自定义结束状态的下拉刷新 view                                                  |
| refresherF2 V2.7.7       | 自定义松手显示二楼状态 view                                                   |
| f2 V2.7.7                | 自定义插入二楼的 view                                                      |

### 底部加载更多

| 名称                 | 说明                 |
| ------------------ | ------------------ |
| loadingMoreDefault | 自定义"默认"状态 view     |
| loadingMoreLoading | 自定义"加载中"状态 view    |
| loadingMoreNoMore  | 自定义"没有更多数据"状态 view |
| loadingMoreFail    | 自定义"加载失败"状态 view   |

### 空数据图

| 名称    | 说明                                                  |
| ----- | --------------------------------------------------- |
| empty | 自定义空数据占位 view，slot-scope: `{isLoadFailed}`(V2.5.0+) |

### 其他

| 名称                | 说明                                                |
| ----------------- | ------------------------------------------------- |
| loading           | 自定义 reload 时的加载 view                              |
| backToTop V1.9.4  | 自定义返回顶部 view                                      |
| cell V2.2.5       | 虚拟列表/内置列表 cell，slot-scope: `{item, index}`        |
| header V2.2.5     | 内置列表 header                                       |
| footer V2.2.5     | 内置列表 footer                                       |
| chatLoading       | 聊天模式顶部加载更多 view，slot-scope: `{loadingMoreStatus}` |
| chatNoMore V2.7.5 | 聊天模式没有更多数据 view                                   |

***

## Methods 方法

> **调用方式**: `this.$refs.paging.xxx()`（ref="paging"）

### 数据刷新&处理

| 方法名                     | 说明                        | 参数                                             |
| ----------------------- | ------------------------- | ---------------------------------------------- |
| reload                  | 重新加载分页数据                  | 参数1(非必填): 是否展示下拉刷新动画，默认false。返回Promise         |
| refresh V2.0.4          | 刷新列表数据，pageNo和pageSize不重置 | 返回Promise                                      |
| refreshToPage V2.5.9    | 刷新列表至指定页                  | 参数1(必填): 目标页数。返回Promise                        |
| complete                | 请求结束，传递结果给z-paging        | 参数1(必填): 结果数组; 参数2(非必填): 是否成功，默认true。返回Promise |
| completeByTotal V2.0.6  | 通过 total 判断是否有更多          | 参数1: 数组; 参数2: total; 参数3: 是否成功                 |
| completeByNoMore V1.9.2 | 自行判断是否有更多                 | 参数1: 数组; 参数2: 是否没有更多(true=没有了); 参数3: 是否成功      |
| completeByError V2.6.3  | 请求失败传入原因                  | 参数1: 失败原因                                      |
| completeByKey V1.6.4    | 保证数据一致性                   | 参数1: 数组; 参数2: dataKey; 参数3: 是否成功               |
| clear V2.1.0            | 清空分页数据                    | -                                              |
| addDataFromTop          | 从顶部添加数据                   | 参数1: 数据; 参数2: 是否滚动到顶部; 参数3: 是否动画               |
| resetTotalData          | 重新设置列表数据                  | 参数1: 修改后的数组                                    |

### 下拉刷新相关

| 方法名                                | 说明                  | 参数 |
| ---------------------------------- | ------------------- | -- |
| endRefresh V2.1.0                  | 终止下拉刷新状态            | -  |
| updateCustomRefresherHeight V2.6.1 | 手动更新自定义下拉刷新 view 高度 | -  |
| goF2 V2.8.7                        | 手动进入二楼              | -  |
| closeF2 V2.7.7                     | 手动关闭二楼              | -  |

### 底部加载更多相关

| 方法名        | 说明         | 参数                            |
| ---------- | ---------- | ----------------------------- |
| doLoadMore | 手动触发上拉加载更多 | 参数1: 来源类型(`click`/`toBottom`) |

### 页面滚动&布局相关

| 方法名                            | 说明                    | 参数             |
| ------------------------------ | --------------------- | -------------- |
| updatePageScrollTop            | 页面滚动时告知 pageScrollTop | 参数1: scrollTop |
| updatePageScrollTopHeight      | 更新 slot="top" 高度      | -              |
| updatePageScrollBottomHeight   | 更新 slot="bottom" 高度   | -              |
| updateLeftAndRightWidth V2.3.5 | 更新 left/right 宽度      | -              |
| updateFixedLayout V2.6.5       | 更新 fixed 布局           | -              |

### 虚拟列表相关

| 方法名                             | 说明            | 参数                |
| ------------------------------- | ------------- | ----------------- |
| doInsertVirtualListItem V2.5.9  | 插入 item       | 参数1: 数据项; 参数2: 位置 |
| didUpdateVirtualListCell V2.4.0 | 更新 cell 缓存高度  | 参数1: cell 位置      |
| didDeleteVirtualListCell V2.4.0 | 删除 cell 后更新缓存 | 参数1: cell 位置      |
| updateVirtualListRender V2.7.11 | 手动触发渲染更新      | -                 |

### 本地分页

| 方法名            | 说明     | 参数                   |
| -------------- | ------ | -------------------- |
| setLocalPaging | 设置本地分页 | 参数1: 完整数组; 参数2: 是否成功 |

### 聊天记录模式

| 方法名                                    | 说明         | 参数                              |
| -------------------------------------- | ---------- | ------------------------------- |
| doChatRecordLoadMore                   | 手动触发顶部加载更多 | -                               |
| addChatRecordData                      | 添加聊天记录     | 参数1: 数据; 参数2: 是否滚到底部; 参数3: 是否动画 |
| addKeyboardHeightChangeListener V2.8.7 | 手动添加键盘高度监听 | -                               |

### 滚动方法

| 方法名                   | 说明                   | 参数                              |
| --------------------- | -------------------- | ------------------------------- |
| scrollToTop           | 滚动到顶部                | 参数1: 是否动画                       |
| scrollToBottom        | 滚动到底部                | 参数1: 是否动画                       |
| scrollIntoViewById    | 滚动到指定view(vue)       | 参数1: id; 参数2: 偏移量; 参数3: 是否动画    |
| scrollIntoViewByNodeTop | 滚动到指定view(vue)     | 参数1: 节点top值(uni.createSelectorQuery获取); 参数2: 偏移量; 参数3: 是否动画 |
| scrollIntoViewByView  | 滚动到指定view(nvue)      | 参数1: view(通过this.$refs获取); 参数2: 偏移量; 参数3: 是否动画 |
| scrollToY V2.1.0      | y轴滚动到指定位置(vue)       | 参数1: 距顶部距离; 参数2: 偏移量; 参数3: 是否动画 |
| scrollToX V2.8.5      | x轴滚动(非页面滚动,vue)      | 参数1: 距左侧距离; 参数2: 偏移量; 参数3: 是否动画 |
| scrollIntoViewByIndex | 滚动到指定view(nvue/虚拟列表) | 参数1: index; 参数2: 偏移量; 参数3: 是否动画 |

### 缓存

| 方法名                | 说明       | 参数 |
| ------------------ | -------- | -- |
| updateCache V2.3.9 | 手动更新缓存数据 | -  |

### 其他

| 方法名                          | 说明           | 参数               |
| ---------------------------- | ------------ | ---------------- |
| getVersion                   | 获取版本号        | -                |
| setListSpecialEffects V2.0.4 | nvue List 特效 | 参数1: 参见uni-app文档 |

***

## 虚拟列表

### 为什么需要虚拟列表

长列表渲染时 DOM 过多导致内存升高、页面卡顿白屏。虚拟列表只渲染可视区域内的 cell，保持 DOM 数量稳定。

### 平台兼容性

**vue2:**

| 写法      | h5 | App | 微信小程序 | QQ小程序 | 支付宝/钉钉 | 头条/抖音 |
| ------- | -- | --- | ----- | ----- | ------ | ----- |
| 内置列表写法  | OK | OK  | 部分    | OK    | OK     | OK    |
| 非内置列表写法 | OK | OK  | 不支持   | 不支持   | 不支持    | 不支持   |
| 兼容写法    | OK | OK  | OK    | OK    | OK     | OK    |

**vue3:**

\| 写法 | h5 | App | 微信小程序 | QQ小程序 | 支付宝/钉钉 | 头条/抖音 |
\|---|---|---|---|---|---|---|---|
\| 内置列表写法 | OK | OK | 不支持 | 不支持 | 不支持 | OK |
\| 非内置列表写法 | OK | OK | OK | OK | OK | 不支持 |
\| 兼容写法 | OK | OK | 不支持 | 不支持 | 不支持 | OK |

### 注意事项

1. cell 不要设 margin-top/margin-bottom，用 padding 代替，否则抖动
2. cell 内 switch 等带状态控件会被销毁重建，需通过 for 循环 item 绑定状态
3. 动态高度 cell 异步增高后需调用 `didUpdateVirtualListCell(index)`
4. 微信小程序+vue2 推荐兼容模式，微信小程序+vue3 推荐非内置列表写法
5. 微信小程序中不同 cell 的 image 可能闪动，可用 background-image 替代

***

## 聊天记录模式

### 特性

- 支持 vue 无闪动聊天记录模式

- 支持 nvue cell 复用

- 支持聊天模式与虚拟列表结合

### 重要注意

- V2.7.0+ 使用新的列表倒置方式实现

- 安卓9以下和iOS15以下系统不支持新模式

- 旧系统需使用 z-paging V2.6.9 或以下版本

### 相关 API

- **Props**: `use-chat-record-mode`, `auto-hide-keyboard-when-chat`, `auto-adjust-position-when-chat`, `auto-scroll-to-bottom-when-chat`, `show-chat-loading`

- **Slots**: `chatLoading`(slot-scope: `{loadingMoreStatus}`), `chatNoMore`

- **Methods**: `doChatRecordLoadMore`, `addChatRecordData`, `addKeyboardHeightChangeListener`

- **Events**: `@hidedKeyboard`, `@keyboardHeightChange`

***

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

***

## 全局错误处理

```js
// 请求失败时（自动触发 complete(false)）
uni.$emit('z-paging-error-emit', '请求失败原因(可选)');

// 请求成功时（自动触发 complete(结果数组)）
uni.$emit('z-paging-complete-emit', 请求结果数组);
```

***

## 常见使用场景

### 仅使用下拉刷新

```html
<z-paging ref="paging" refresher-only @onRefresh="onRefresh">
    <!-- 页面内容 -->
</z-paging>
```

### 延迟加载列表（先获取 tabs 再加载列表）

```html
<z-paging ref="paging" v-model="dataList" :auto="false" @query="queryList">
```

获取 tabs 后调用 `this.$refs.paging.reload()`

### 使用页面滚动

```html
<z-paging ref="paging" v-model="dataList" use-page-scroll @query="queryList">
```

需引入 mixin：`import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'`

### 虚拟列表（内置列表写法）

```html
<z-paging ref="paging" use-virtual-list @query="queryList">
    <template #cell="{item,index}">
        <view class="item-title">{{item.title}}</view>
    </template>
</z-paging>
```

### 虚拟列表（非内置列表写法）

```html
<z-paging ref="paging" use-virtual-list :force-close-inner-list="true"
    @virtualListChange="virtualListChange" @query="queryList">
    <view class="item" :id="`zp-id-${item.zp_index}`" :key="item.zp_index"
        v-for="(item,index) in virtualList">
        <view class="item-title">{{item.title}}</view>
    </view>
</z-paging>
```

### 使用 fetch 极简写法 (V2.7.8+)

```html
<z-paging ref="paging" v-model="dataList" :fetch="queryList" :fetch-params="{ type: tabIndex + 1 }">
```

> 设置 `:fetch` 后 `@query` 不再触发，z-paging 会自动调用 fetch 并处理 complete

### 本地分页

服务端一次性返回大量数据时，z-paging 在本地自动分页处理：

```js
this.$refs.paging.setLocalPaging(res.data.list);
```

### 数据缓存

用户首次进入先加载缓存数据，再从服务端获取最新数据刷新：

```html
<z-paging ref="paging" v-model="dataList" use-cache cache-key="goodsList" @query="queryList">
```

### 自定义下拉刷新

```html
<z-paging ref="paging" v-model="dataList" @query="queryList">
    <template #refresher="{refresherStatus}">
        <custom-refresher :status="refresherStatus" />
    </template>
    <!-- 列表内容 -->
</z-paging>
```

### 自定义加载更多

```html
<z-paging ref="paging" v-model="dataList" @query="queryList">
    <template #loadingMoreLoading>
        <view class="custom-loading">加载中...</view>
    </template>
    <template #loadingMoreNoMore>
        <view class="custom-no-more">到底啦~</view>
    </template>
</z-paging>
```

### 自定义空数据图

```html
<z-paging ref="paging" v-model="dataList" @query="queryList">
    <template #empty="{isLoadFailed}">
        <view class="custom-empty">
            <image src="/static/empty.png" />
            <text>{{ isLoadFailed ? '加载失败' : '暂无数据' }}</text>
        </view>
    </template>
</z-paging>
```

### 在弹窗中使用（非固定布局）

```html
<z-paging ref="paging" v-model="dataList" :fixed="false" height="500rpx" @query="queryList">
    <view class="item" v-for="(item,index) in dataList" :key="index">
        <text>{{item.title}}</text>
    </view>
</z-paging>
```

> 弹窗内使用必须设置 `:fixed="false"` 并指定确定高度

### 下拉进入二楼

```html
<z-paging ref="paging" v-model="dataList" :refresher-f2-enabled="true" @query="queryList">
    <template #f2>
        <view class="f2-content">
            <text>这里是二楼内容</text>
        </view>
    </template>
    <view class="item" v-for="(item,index) in dataList" :key="index">
        <text>{{item.title}}</text>
    </view>
</z-paging>
```

### 数据一致性（tab 切换场景）

```html
<z-paging ref="paging" v-model="dataList" :data-key="tabIndex" @query="queryList">
```

```js
queryList(pageNo, pageSize) {
    this.$request.queryList({ pageNo, pageSize, type: this.tabIndex }).then(res => {
        // 使用 completeByKey 保证数据一致性
        this.$refs.paging.completeByKey(res.data.list, this.tabIndex);
    })
}
```

### 吸顶效果（slot="top"）

```html
<z-paging ref="paging" v-model="dataList" @query="queryList">
    <template #top>
        <view class="sticky-header">
            <text>吸顶内容</text>
        </view>
    </template>
    <view class="item" v-for="(item,index) in dataList" :key="index">
        <text>{{item.title}}</text>
    </view>
</z-paging>
```

***

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

## 公用子组件

### z-paging-swiper

在 swiper 中使用 z-paging 时的根节点容器，默认铺满全屏，免计算高度。

**Props：**

| 参数                     | 说明                 | 类型      | 默认值   |
| ---------------------- | ------------------ | ------- | ----- |
| fixed                  | 是否使用 fixed 布局      | Boolean | true  |
| safe-area-inset-bottom | 是否开启底部安全区域适配       | Boolean | false |
| swiper-style           | z-paging-swiper 样式 | Object  | {}    |

**Slots：** `top`、`bottom`、`left`、`right`（同 z-paging 主组件）

**Methods：** `updateLeftAndRightWidth`、`updateFixedLayout`

### z-paging-swiper-item

swiper+list 极简写法中的 swiper-item 包装封装。

**Props：**

| 参数            | 说明                    | 类型     | 默认值 |
| ------------- | --------------------- | ------ | --- |
| tab-index     | 当前组件在 swiper 中的 index | Number | 0   |
| current-index | 当前 swiper 切换到的 index  | Number | 0   |

**Methods：** `reload`、`complete`

**Events：** `@query`、`@updateList`

### z-paging-empty-view

通用的空数据组件，可独立使用。

**Props：**

| 参数                      | 说明             | 类型      | 默认值     |
| ----------------------- | -------------- | ------- | ------- |
| empty-view-fixed        | 是否铺满 z-paging  | Boolean | false   |
| empty-view-text         | 描述文字           | String  | 没有数据哦\~ |
| empty-view-img          | 空数据图图片（建议绝对路径） | String  | 内置图片    |
| empty-view-reload-text  | 重新加载文字         | String  | 重新加载    |
| empty-view-style        | 空数据 view 样式    | Object  | {}      |
| empty-view-img-style    | img 样式         | Object  | {}      |
| empty-view-title-style  | 描述文字样式         | Object  | {}      |
| empty-view-reload-style | 重新加载按钮样式       | Object  | {}      |
| show-empty-view-reload  | 是否显示重新加载按钮     | Boolean | false   |
| is-load-failed          | 是否加载失败         | Boolean | false   |
| unit                    | 布局单位           | String  | rpx     |

**Events：** `@reload`、`@viewClick`

### z-paging-cell（v2.3.1+）

兼容 nvue 和 vue 中的 cell 渲染。nvue 中渲染为 `<cell />`，vue 中渲染为 `<view />`。

**Props：** `cell-style`（Object，默认 {}）

***

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

***

## uniapp-x 版

- **uniapp-x** 是下一代 uni-app，基于 uts 语言，App 端编译为 swift/kotlin

- z-paging-x 是专门为 uniapp-x 适配的版本

- 插件地址：<https://ext.dcloud.net.cn/plugin?name=z-paging-x>

- 注意：z-paging-x 与 z-paging 是独立的插件，请根据项目类型选择安装

***

## mini 版

在完全版基础上删除部分非核心功能，**体积缩减约 40%**。

- 组件名为 **`z-paging-mini`**

- 安装：解压后复制到 `/uni_modules/` 目录

- 若项目中原来有 z-paging，必须删除旧的

- mixins 路径中的 z-paging 也需改为 z-paging-mini

**mini 版删除的功能：**

- 虚拟列表、聊天记录模式、i18n 国际化

- 全局 complete、interceptor 拦截器、列表缓存

- 部分样式自定义属性（refresherImgStyle、refresherVibrate、refresherOutRate 等）

- 部分方法（completeByKey、endxxx、resetTotalData、addDataFromTop）

- z-paging-swiper-item 组件

***

## i18n 国际化（v1.6.5+）

### v2.4.1+（与 uni-app 国际化方案对齐）

- 通过 `uni.getLocale()` 获取当前语言

- 通过 `uni.setLocale(locale)` 设置语言

- 通过 `uni.onLocaleChange(callback)` 监听语言切换

- 默认支持：英文(en)、中文简体(zh-Hans)、中文繁体(zh-Hant)

- **新增语言**：在 `/z-paging/components/z-paging/i18n` 目录添加语言文件（如 `ja.json`），在 `index.js` 中 import，通过 `uni.setLocale('ja')` 切换

### v2.4.1 之前（已废弃）

```js
import zI18n from '@/uni_modules/z-paging/components/z-paging/js/z-paging-i18n'
zI18n.setLanguage('zh-cn');
const language = zI18n.getLanguageName();
```

***

## nvue 模块

**核心注意事项：**

- nvue 中 z-paging 默认渲染为 `<list />` 标签（性能优于 view/scroll-view）

- z-paging 中的 view 必须是 `<cell />`、`<header />` 等 list 独有子组件

- v-for 必须写在 cell 标签上，index 不能作为 key 的唯一标识

- 跨平台兼容使用 `<z-paging-cell />`

**写法示例：**

```html
<z-paging ref="paging" v-model="dataList" @query="queryList">
    <cell class="item" v-for="(item,index) in dataList" :key="item.id" @click="itemClick(item)">
        <text class="item-title">{{item.title}}</text>
    </cell>
</z-paging>
```

***

## 常见问题 FAQ（28条）

### 布局与显示问题

**Q1: 为什么 z-paging 盖住了页面上的其他 view？**

- 默认铺满全屏，将所有 view 放在 z-paging 标签内，固定顶部用 `slot="top"`，固定底部用 `slot="bottom"`

- `slot="top"` 和 `slot="bottom"` 内的 view 不要设置 `position: fixed`

**Q2: 为什么无法下拉刷新？**

- 必须在 `@query` 函数中调用 `complete` 方法，否则不允许下次分页操作

**Q3: 页面滚动(use-page-scroll)时，滚动到底部不加载更多？**

- 必须引入 mixins

**Q5: slot="top" 内的 picker、popup 被 cell 盖住？**

- 通过 `:content-z-index="1"` 降低列表内容的 z-index

**Q11: 微信小程序中列表空白？**

- 可能设置了 `:fixed="false"`，需通过 `height` 或 `:paging-style` 设置高度，不能通过 style/class

**Q12: 看不到底部"正在加载"和"没有更多了"？**

- 自定义 tabbar 需放在 z-paging 标签内并设置 `slot="bottom"`

**Q16: 监听 onPageScroll、onReachBottom 无效？**

- 默认局部滚动不触发页面事件，用 `@scroll` 和 `@scrolltolower`

**Q20: 给 z-paging 父容器设置背景色无效？**

- z-paging 默认 `position: fixed` 脱离文档流，父容器高度为0。设置 page 背景色或用 `bg-color` 属性

**Q27: 弹窗被 slot=top/bottom 盖住？**

- 将弹窗放在 z-paging 标签外

### nvue 相关

**Q7: nvue 中 v-model 有数据但列表空白？**

- nvue 中子组件必须是 `<cell />` 或 `<z-paging-cell />`

**Q8: nvue 中第二页显示"点击加载更多"？**

- v-for 必须写在 cell 标签上

**Q9: nvue 瀑布流非白色背景下拉刷新看到白色线？**

- 设置 `:nvue-refresher-style="{ background: 'black' }"`

**Q10: nvue + vue3 中 nvue-list-is="waterfall" 无效？**

- 此为 nvue 的 bug

### 小程序相关

**Q13: 支付宝/钉钉小程序无法下拉刷新？**

- 在 `pages.json` 设置 `"mp-alipay": { "allowsBounceVertical": "NO" }`

**Q14: 支付宝/钉钉小程序报错 Cannot read properties of null？**

- 需启用 `component2`

**Q23: 微信小程序中 dataList 赋值给子组件无法渲染？**

- props 使用短横线命名如 `:data-list` 改为驼峰 `:dataList`

### 数据与请求问题

**Q4: 复制 demo 代码报 TypeError？**

- `this.$request.queryList` 是测试用请求，需替换为项目中的请求

**Q17: 加载更多时数据覆盖而非拼接？**

- 不要给 v-model 绑定的 list 赋值，直接 `this.$refs.paging.complete(请求结果数组)`

**Q18: 列表总数是 pageSize 倍数时会多请求一次空数组？**

- 默认判断：complete 参数数组长度 < pageSize 则无更多数据

- 解决：使用 `completeByTotal(请求结果数组, 列表总长度)` 通过 total 判断

**Q19: 加载更多不断触发，数据重复？**

- 后端可能无数据时返回第一页数据，使用 `completeByTotal` 解决

**Q22: queryList 会触发两次？**

- 可能在 onLoad/onShow 中调用了 `reload()`，用 `:auto="false"` 关闭默认触发

### 其他问题

**Q6: 项目中无法下拉刷新？**

- 必须调用 `complete` 才允许下次下拉刷新

**Q15: 列表滚动到底部后继续上拉被锁住3-5秒？**

- 系统 bounce 导致，在 `pages.json` 设置 `"app-plus": { "bounce": "none" }`

**Q21: uview1.x 的 u-waterfall 下拉刷新数据未重置？**

- 下拉刷新时调用 `this.$refs.uWaterfall.clear()`

**Q24: vue3 + uview-plus 滚动到顶部按钮无效？**

- 此为 uview-plus 的问题

**Q25: iPhone + tabbar 页面返回后底部有空白？**

- 在 tabbar 页面 onShow 中调用 `this.$refs.paging.updateFixedLayout()`（v2.6.5+）

**Q26: 聊天记录模式 + tabbar 页面打开键盘后底部空白？**

- 设置 `:chat-adjust-position-offset="-44"`

**Q28: cli + z-paging 报 TypeError: vue.undefined is not a function？**

- 检查 package.json 中是否包含 `@vue/compiler-core`、`vue-tsc` 或 `@dcloudio/vite-plugin-uni`，有则移除

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

