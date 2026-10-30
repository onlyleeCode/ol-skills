# z-paging Slots 插槽

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [Slots 插槽](#slots-插槽)
  - [主体布局](#主体布局)
  - [下拉刷新](#下拉刷新)
  - [底部加载更多](#底部加载更多)
  - [空数据图](#空数据图)
  - [其他](#其他)

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
