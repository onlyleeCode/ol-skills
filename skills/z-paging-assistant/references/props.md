# z-paging Props 配置

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [Props 配置](#props-配置)
  - [一、数据&布局配置](#一数据布局配置)
  - [二、reload相关配置](#二reload相关配置)
  - [三、下拉刷新配置](#三下拉刷新配置)
  - [四、底部加载更多配置](#四底部加载更多配置)
  - [五、空数据与加载失败图配置](#五空数据与加载失败图配置)
  - [六、全屏Loading配置](#六全屏loading配置)
  - [七、返回顶部按钮配置](#七返回顶部按钮配置)
  - [八、虚拟列表&内置列表配置](#八虚拟列表内置列表配置)
  - [九、本地分页配置](#九本地分页配置)
  - [十、聊天记录模式配置](#十聊天记录模式配置)
  - [十一、scroll-view&滚动相关配置](#十一scroll-view滚动相关配置)
  - [十二、nvue独有配置](#十二nvue独有配置)
  - [十三、i18n国际化配置](#十三i18n国际化配置)
  - [十四、缓存配置](#十四缓存配置)
  - [十五、z-index配置](#十五z-index配置)
  - [十六、其他配置](#十六其他配置)

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

> 注：2.8.8 changelog 中的 `in-swiper-slot` / `virtual-in-swiper-slot` 在当前源码中实际属性为 `parent-level` / `virtual-parent-level`，见 [八、虚拟列表&内置列表配置](#八虚拟列表内置列表配置) 和 [十一、scroll-view&滚动相关配置](#十一scroll-view滚动相关配置)。

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
