---
name: "picsum-photos"
description: "生成 Picsum Photos 占位图片 URL 及调用 API。当用户需要随机占位图、固定尺寸占位图片、灰度/模糊图片、或以 seed 稳定取图时调用。"
---

# Lorem Picsum 占位图片服务

Picsum Photos 是免费的占位图片服务（Lorem Ipsum for photos），所有图片来自 Unsplash，适用于开发、原型、UI 设计、演示场景。

## 基础用法

| 类型 | URL 格式 | 示例 |
|------|----------|------|
| 指定宽高 | `https://picsum.photos/{width}/{height}` | `https://picsum.photos/200/300` |
| 正方形 | `https://picsum.photos/{size}` | `https://picsum.photos/200` |

## 高级功能

### 1. 指定特定图片
用图片 ID 获取固定图片：`https://picsum.photos/id/{id}/{width}/{height}`
示例：`https://picsum.photos/id/237/200/300`
可用图片列表见 `https://picsum.photos/images`

### 2. 基于种子固定随机图
相同 seed 返回同一张图：`https://picsum.photos/seed/{seed}/{width}/{height}`
示例：`https://picsum.photos/seed/picsum/200/300`

### 3. 灰度
`https://picsum.photos/200/300?grayscale`

### 4. 模糊
- 默认模糊：`https://picsum.photos/200/300?blur`
- 指定级别(1-10)：`https://picsum.photos/200/300?blur=2`

### 5. 参数组合
多个参数用 `&` 连接：`https://picsum.photos/id/870/200/300?grayscale&blur=2`

### 6. 防止缓存
页面中多张同尺寸图加 `random` 参数：
```html
<img src="https://picsum.photos/200/300?random=1">
<img src="https://picsum.photos/200/300?random=2">
```

### 7. 指定格式
- JPEG：`https://picsum.photos/200/300.jpg`
- WebP：`https://picsum.photos/200/300.webp`

## API 端点

### 图片列表
```
GET https://picsum.photos/v2/list?page=2&limit=100
```
- `page` 页码（默认 1），`limit` 每页数量（默认 30）
- 响应 `Link` 头含分页信息
- 返回字段：`id`、`author`、`width`、`height`、`url`、`download_url`

### 单张图片详情
```
GET https://picsum.photos/id/{id}/info
GET https://picsum.photos/seed/{seed}/info
```

## 获取图片 ID
- HTTP 响应头：`Picsum-ID` 字段
- EXIF 元数据：`User Comment` 字段

## 快速参考

| 需求 | URL |
|------|-----|
| 200x300 随机图 | `https://picsum.photos/200/300` |
| 200x300 正方形 | `https://picsum.photos/200` |
| 固定图片(ID:237) | `https://picsum.photos/id/237/200/300` |
| 固定随机图(seed:abc) | `https://picsum.photos/seed/abc/200/300` |
| 灰度图 | `https://picsum.photos/200/300?grayscale` |
| 模糊图 | `https://picsum.photos/200/300?blur=2` |
| WebP 格式 | `https://picsum.photos/200/300.webp` |

## 相关链接
- 官网：https://picsum.photos
- 图片列表：https://picsum.photos/images
- 图片来源：https://unsplash.com