# z-paging 平台专项

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [uniapp-x 版](#uniapp-x-版)
- [mini 版](#mini-版)
- [i18n 国际化（v1.6.5+）](#i18n-国际化v165)
  - [v2.4.1+（与 uni-app 国际化方案对齐）](#v241与-uni-app-国际化方案对齐)
  - [v2.4.1 之前（已废弃）](#v241-之前已废弃)
- [nvue 模块](#nvue-模块)

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
