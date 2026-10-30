# z-paging 聊天记录模式

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [聊天记录模式](#聊天记录模式)
  - [特性](#特性)
  - [重要注意](#重要注意)
  - [相关 API](#相关-api)

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
