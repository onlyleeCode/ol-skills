# z-paging Events 事件

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [Events 事件](#events-事件)
  - [数据处理相关](#数据处理相关)
  - [下拉刷新相关](#下拉刷新相关)
  - [底部加载更多相关](#底部加载更多相关)
  - [空数据与加载失败相关](#空数据与加载失败相关)
  - [返回顶部按钮相关](#返回顶部按钮相关)
  - [虚拟列表相关](#虚拟列表相关)
  - [聊天记录模式相关](#聊天记录模式相关)
  - [滚动相关](#滚动相关)
  - [布局&交互相关](#布局交互相关)

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
