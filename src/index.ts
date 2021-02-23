/**
 * @author 翠林
 * @deprecated 对 Storage 的封装
 */

import Events from './event'

/**
 * Store 实例的内部缓存
 */
type Data = {
    [propName: string]: any
}

/**
 * Storage 管理器
 */
export default class Store {
    /** 当前实例的标识 */
    #uuid: string = Math.random().toString(16).slice(2, 12)

    /** Storage */
    #storage: Storage

    /**
     * 当前实例对数据的缓存
     */
    #data: Data = {}

    /** 事件管理器 */
    public events: Events = new Events()

    /**
     * 获取当前空间下的所有数据
     */
    public get data() {
        return this.#data
    }

    /**
     * 获取当前空间下键值对的个数
     */
    public get size() {
        return this.keys().length
    }

    /**
     * 创建数据库管理器实例
     * @param storage Storage 类型
     * @param namespace Storage 的键名
     */
    public constructor(protected storage: 'local' | 'session', protected namespace: string = 'clinfc-store') {
        this.#storage = storage === 'local' ? window.localStorage : window.sessionStorage

        this.synchrodata(false)

        // storage 事件的回调函数
        const storagefn = (e: StorageEvent) => {
            if (e.key === this.namespace) {
                this.synchrodata(false)
            }
        }

        // 自定义 storage change 事件的回调函数
        const storagechangefn = (e: CustomEventInit) => {
            if (e.detail && e.detail.namespace === this.namespace) {
                if (e.detail.uuid !== this.#uuid) {
                    this.synchrodata(false)
                }
                this.events.emeit('change')
            }
        }

        // 绑定监听
        window.addEventListener('storage', storagefn)
        window.addEventListener(`${this.storage}storagechange`, storagechangefn)

        // 销毁时取消监听事件
        this.events.once('destory', () => {
            window.removeEventListener('storage', storagefn)
            window.removeEventListener(`${this.storage}storagechange`, storagechangefn)
        })
    }

    /**
     * 获取当前命名空间下所有的键的集合。返回一个数组。
     */
    public keys() {
        return Object.keys(this.#data)
    }

    /**
     * 判断缓存中是否包含该键名
     * @param key 键名
     */
    public has(key: string) {
        return key in this.#data
    }

    /**
     * 获取指定键名的数据
     * @param key 键名
     */
    public get(key: string) {
        if (this.has(key)) {
            return this.#data[key]
        }
        return null
    }

    /**
     * 批量获取数据。不存在的键名其值将为 null
     * @param keys 需要获取的键名集合
     */
    public gets(...keys: string[]) {
        const temp: Data = {}
        keys.forEach(key => {
            temp[key] = this.get(key)
        })
        return temp
    }

    /**
     * 批量获取数据。只返回存在的键及其值
     * @param keys 需要获取的键名集合
     */
    public only(...keys: string[]) {
        const temp: Data = {}
        keys.forEach(key => {
            if (this.has(key)) {
                temp[key] = this.get(key)
            }
        })
        return temp
    }

    /**
     * 添加/设置值
     * @param key 键名
     * @param value 值
     */
    public set(key: string, value: any) {
        this.#data[key] = value
        this.synchrodata(true)
        this.dispatch()
        return this
    }

    /**
     * 批量设置数据
     * @param data Object 对象
     */
    public sets(data: Data) {
        const entries = Object.entries(data)
        if (entries.length) {
            entries.forEach(([key, value]) => {
                this.#data[key] = value
            })
            this.synchrodata(true)
            this.dispatch()
        }
        return this
    }

    /**
     * 删除指定键名数据
     * @param key 需要被删除的键
     */
    public remove(...keys: string[]) {
        keys = keys.filter(key => this.has(key))
        if (keys.length) {
            keys.forEach(key => {
                delete this.#data[key]
            })
            this.synchrodata(true)
            this.dispatch()
        }
        return this
    }

    /**
     * 清除数据
     */
    public clear() {
        this.#data = {}
        this.#storage.removeItem(this.namespace)
        this.dispatch()
        return this
    }

    /**
     * 销毁实例
     */
    public destroy() {
        this.events.emeit('destory')
        this.events.clear()
        this.#data = {}
    }

    /**
     * 发布 sessionstoragechange/localstoragechange 事件
     */
    public dispatch() {
        const event = new CustomEvent(`${this.storage}storagechange`, {
            bubbles: true,
            cancelable: true,
            detail: {
                uuid: this.#uuid,
                namespace: this.namespace,
            },
        })
        window.dispatchEvent(event)
    }

    /**
     * 同步当前实例与 Storage 中的数据
     * @param isSave true: 将实例中的缓存数据保存到 Storage 中；false: 将 Storage 中数据同步到当前实例的缓存中
     */
    public synchrodata(isSave: boolean = true) {
        if (isSave) {
            // 将当前实例中的数据保存到缓存中
            this.#storage.setItem(this.namespace, JSON.stringify(this.#data))
        } else {
            // 将缓存中的数据同步到当前实例中
            const data = this.#storage.getItem(this.namespace)
            if (data && /^\{.*\}$/.test(data)) {
                this.#data = JSON.parse(data)
            } else {
                this.#data = {}
            }
        }
    }

    /**
     * 快捷创建 sessionStorage 类型数据库管理器实例
     * @param namespace 数据库名称
     */
    public static session(namespace?: string) {
        return new Store('session', namespace)
    }

    /**
     * 快捷创建 localStorage 类型数据库管理器实例
     * @param namespace 数据库名称
     */
    public static local(namespace?: string) {
        return new Store('local', namespace)
    }
}
