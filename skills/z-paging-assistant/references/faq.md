# z-paging 常见问题 FAQ

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [常见问题 FAQ（28条）](#常见问题-faq28条)
  - [布局与显示问题](#布局与显示问题)
  - [nvue 相关](#nvue-相关)
  - [小程序相关](#小程序相关)
  - [数据与请求问题](#数据与请求问题)
  - [其他问题](#其他问题)

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
