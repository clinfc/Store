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

> `store = new Store(storage, namespace)`

参数|描述
:-|:-|
`storage`|创建的 `Storage` 管理器类型。可选值有 `session` 和 `local`，分别代表 `sessionStorage` 和 `localStorage`
`namespace`|命名空间

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

> `store = Store.session(namespace)`

参数|数据类型|描述
:-|:-|:-|
`namespace`|`String`|命名空间

#### 示例

```js
const store = Store.session('session-store')
// 等效于
const store = new Store('session', 'session-store')
```

## Store.local()

快速创建一个 `localStorage` 管理器

#### 用法

> `store = Store.local(namespace)`

参数|数据类型|描述
:-|:-|:-|
`namespace`|`String`|命名空间

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

## store.events

事件管理器（发布订阅）。内置的事件有 `change` 和 `destory`。

```js
const store = Store.local('local-store')

// 一次性事件
store.evnets.once('destory', function() {
    store.remove('keys')
})

function change(e) {}

// 监听 change 事件
store.events.on('change', change)

// 发布 change 事件
store.evnets.emit('change', {
    key: 'age',
    value: 24,
    oldValue: 12
})

// 移除监听
store.evnets.off('change', change)

// 移除 change 事件下的所有监听
store.events.remove('change')

// 清除所有事件监听
store.events.clear()
```


---

# 实例方法

## store.keys()

获取所有的键名，返回一个一位数组。

#### 用法

> `store.keys()`

### 示例

```js
const store = Store.local('local-store')
store.set('name', 'store')
store.set('keys', ['name', 'age', 'sex', 'qq', 'tel'])

store.keys()        // ['name', 'keys']
```

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


## store.sets()

批量添加/设置数据

#### 用法

> `store.sets(data)`

参数|数据类型|描述
:-|:-|:-|
`data`|`Object`|`Object`数据

### 示例

```js
const store = Store.local('local-store')
store.sets({ 
    name: 'store',
    age: 24,
    sex: '男',
    keys: ['name', 'age', 'sex', 'qq', 'tel'],
})
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
store.sets({ 
    name: 'store',
    age: 24,
    sex: '男',
    keys: ['name', 'age', 'sex', 'qq', 'tel'],
})

store.get('name')   // 'store'
store.get('keys')   // ['name', 'age', 'sex', 'qq', 'tel']
store.get('tel')    // null
```

## store.gets()

批量获取数据。不存在的键名其值将为 `null`

#### 用法

> `store.gets(key1[, key2, key3...])`

参数|数据类型|描述
:-|:-|:-|
`key`|`String`|键名

### 示例

```js
const store = Store.local('local-store')
store.set('name', 'store')
store.set('age', 24)
store.set('sex', '男')

store.gets('name')                  // { name: 'store' }
store.gets('name', 'age', 'tel')    // { name: 'store', age: 24, tel: null }
```


## store.only()

批量获取数据。只返回存在的键及其值

#### 用法

> `store.only(key1[, key2, key3...])`

参数|数据类型|描述
:-|:-|:-|
`key`|`String`|键名

### 示例

```js
const store = Store.local('local-store')
store.set('name', 'store')
store.set('age', 24)
store.set('sex', '男')

store.gets('tel')                   // {}
store.only('name', 'age', 'tel')    // { name: 'store', age: 24 }
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

> `store.remove(key1[, key2, key3,...])`

参数|数据类型|描述
:-|:-|:-|
`key`|`String`|键名

### 示例

```js
const store = Store.local('local-store')
store.sets({ 
    name: 'store',
    age: 24,
    sex: '男',
    keys: ['name', 'age', 'sex', 'qq', 'tel'],
})

store.remove('keys')
store.remove('name', 'age')
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
