# Store

对 `Storage` 的简单封装。支持命名空间；支持 `localStorage` 在**不同标签页**和在**同一标签页**中数据变化的监听；支持 `sessionStorage` 在**同一标签页**数据变化的监听。


# 安装

### script

直接引入 dist/index.min.js 文件即可

```html
<script src="Store/dist/index.min.js"></script>
```

---

# 构造函数

`Store()` 创建一个 `Storeage` 管理器

#### 用法

> `store = new Store(dbtype, dbname)`

参数|描述
:-|:-|
`dbtype`|创建的 `Storage` 管理器类型。可选值有 `session` 和 `local`，分别代表 `sessionStorage` 和 `localStorage`
`dbname`|命名空间

#### 示例

创建一个 `sessionStorage` 管理器

```js
const store = new Store('session', 'session-store')
```

创建一个 `localStorage` 管理器

```js
const store = new Store('local', 'local-store')
```


---

# 静态方法

## Store.session()

快速创建一个 `sessionStorage` 管理器

#### 用法

> `store = Store.session(dbname)`

参数|描述
:-|:-|
`dbname`|命名空间

#### 示例

```js
const store = Store.session('session-store')
// 等效于
const store = new Store('session', 'session-store')
```

## Store.local()

快速创建一个 `localStorage` 管理器

#### 用法

> `store = Store.local(dbname)`

参数|描述
:-|:-|
`dbname`|命名空间

#### 示例

```js
const store = Store.local('local-store')
// 等效于
const store = new Store('local', 'local-store')
```


---


# 实例属性

## store.data

获取当前空间下的所有数据。只读。

## store.destoryfn

实例销毁前执行的回调函数集合

```js
const store = Store.local('local-store')

// 添加销毁前回调函数
store.destoryfn.push(function() {
    store.remove('keys')
})

// 添加数据
store.set('name', 'store')
store.set('keys', ['name', 'age', 'sex', 'qq', 'tel'])

// 销毁当前实例
store.destory()
```


---

# 实例方法

## store.set()

添加/设置键值数据

#### 用法

> `store.set(key, value)`

参数|数据类型|描述
:-|:-|:-|
`key`|`String`|键名
`value`|`any`|键值

### 示例

```js
const store = Store.local('local-store')
store.set('name', 'store')
store.set('keys', ['name', 'age', 'sex', 'qq', 'tel'])
```

## store.get()

获取指定键名的数据，该键名不存在时返回 `null`

#### 用法

> `store.get(key)`

参数|数据类型|描述
:-|:-|:-|
`key`|`String`|键名

### 示例

```js
const store = Store.local('local-store')
store.set('name', 'store')
store.set('keys', ['name', 'age', 'sex', 'qq', 'tel'])

store.get('name')   // 'store'
store.get('keys')   // ['name', 'age', 'sex', 'qq', 'tel']
store.get('age')    // null
```
## store.has()

判断缓存中是否包含指定键名

#### 用法

> `store.has(key)`

参数|数据类型|描述
:-|:-|:-|
`key`|`String`|键名

### 示例

```js
const store = Store.local('local-store')
store.has('name')   // false

store.set('name', 'local')
store.has('name')   // true
```

## store.remove()

移除指定键名的数据

#### 用法

> `store.remove(key)`

参数|数据类型|描述
:-|:-|:-|
`key`|`String`|键名

### 示例

```js
const store = Store.local('local-store')
store.set('name', 'store')
store.set('keys', ['name', 'age', 'sex', 'qq', 'tel'])

store.remove('keys')
store.has('keys')       // false
```

## store.clear()

清除当前空间下的所有数据

#### 用法

> `store.clear()`

### 示例

```js
const store = Store.local('local-store')
store.set('name', 'store')
store.set('keys', ['name', 'age', 'sex', 'qq', 'tel'])

store.clear()

store.has('keys')       // false
store.has('name')       // false
```

## store.destory()

销毁当前实例。执行此方法后将不再监听 `Storage` 的数据变化并清空实例中的缓存数据

#### 用法

> `store.destory()`

#### 实例

```js
const store = Store.local('local-store')
store.destory()
```
