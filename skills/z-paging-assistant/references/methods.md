# z-paging Methods 方法

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [Methods 方法](#methods-方法)
  - [数据刷新&处理](#数据刷新处理)
  - [下拉刷新相关](#下拉刷新相关)
  - [底部加载更多相关](#底部加载更多相关)
  - [页面滚动&布局相关](#页面滚动布局相关)
  - [虚拟列表相关](#虚拟列表相关)
  - [本地分页](#本地分页)
  - [聊天记录模式](#聊天记录模式)
  - [滚动方法](#滚动方法)
  - [缓存](#缓存)
  - [其他](#其他)

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
