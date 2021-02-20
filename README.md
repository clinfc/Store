# Store

对 Storage 的简单封装。支持命名空间；支持 localStorage 不同标签页和同一标签页数据变化的监听；支持 sessionStorage 同一标签页数据变化的监听。


# 安装

### script

直接引入 dist/index.min.js 文件即可

```html
<script src="image-history/dist/index.min.js"></script>
```


# 构造函数

`Store()` 创建一个 `Storeage` 管理器

参数|描述
:-|:-|
`dbtype`|创建的 `Storage` 管理器类型。可选值有 `session` 和 `local`，分别代表 `sessionStorage` 和 `localStorage`
`dbname`|命名空间

### 示例

```js
// 创建一个 sessionStorage 管理器
const s1 = new Store('session', 's1')


// 创建一个 localStorage 管理器
const l1 = new Store('local', 'l1')
```

# 静态方法

## `Store.session()`

快速创建一个 `sessionStorage` 管理器

```js
const s1 = Store.session('s1')
// 等效于
const s1 = new Store('session', 's1')
```

## `Store.local()`

快速创建一个 `localStorage` 管理器

```js
const l1 = Store.local('l1')
// 等效于
const l1 = new Store('local', 'l1')
```

# 实例方法
