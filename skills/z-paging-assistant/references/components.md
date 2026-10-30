# z-paging 公用子组件

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [公用子组件](#公用子组件)
  - [z-paging-swiper](#z-paging-swiper)
  - [z-paging-swiper-item](#z-paging-swiper-item)
  - [z-paging-empty-view](#z-paging-empty-view)
  - [z-paging-cell（v2.3.1+）](#z-paging-cellv231)

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
