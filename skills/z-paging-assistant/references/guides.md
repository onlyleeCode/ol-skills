# z-paging 常见使用场景

> 返回 [SKILL.md](../SKILL.md) ｜ 适用 z-paging v2.8.8

## 本文件内容

- [常见使用场景](#常见使用场景)
  - [仅使用下拉刷新](#仅使用下拉刷新)
  - [延迟加载列表（先获取 tabs 再加载列表）](#延迟加载列表先获取-tabs-再加载列表)
  - [使用页面滚动](#使用页面滚动)
  - [虚拟列表（内置列表写法）](#虚拟列表内置列表写法)
  - [虚拟列表（非内置列表写法）](#虚拟列表非内置列表写法)
  - [使用 fetch 极简写法 (V2.7.8+)](#使用-fetch-极简写法-v278)
  - [本地分页](#本地分页)
  - [数据缓存](#数据缓存)
  - [自定义下拉刷新](#自定义下拉刷新)
  - [自定义加载更多](#自定义加载更多)
  - [自定义空数据图](#自定义空数据图)
  - [在弹窗中使用（非固定布局）](#在弹窗中使用非固定布局)
  - [下拉进入二楼](#下拉进入二楼)
  - [数据一致性（tab 切换场景）](#数据一致性tab-切换场景)
  - [吸顶效果（slot="top"）](#吸顶效果slottop)

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
