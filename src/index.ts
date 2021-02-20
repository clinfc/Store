/**
 * @author 翠林
 * @deprecated 对 Storage 的封装
 */

type Data = {
    [propName: string]: any
}

export default class Store {
    /** 当前实例的标识 */
    public readonly uuid: string = Math.random().toString(16).slice(2, 12)

    /** Storage */
    private storage: Storage

    /** Storage 类型 */
    private dbtype: 'local' | 'session'

    /** 命名空间 */
    private dbname: string

    /**
     * 当前实例对数据的缓存
     */
    private data: Data = {}

    /**
     * 实例销毁函数
     */
    public destroy: Function

    /**
     * 创建数据库管理器实例
     * @param dbtype Storage 类型
     * @param dbname Storage 的键名
     */
    public constructor(dbtype: 'local' | 'session', dbname?: string) {
        this.dbtype = dbtype
        this.dbname = dbname || 'clinfc-store'
        this.storage = dbtype === 'local' ? window.localStorage : window.sessionStorage

        this.synchrodata(false)

        // storage 事件的回调函数
        const storagefn = (e: StorageEvent) => {
            if (e.key === this.dbname) {
                this.synchrodata(false)
            }
        }

        // 自定义 storage change 事件的回调函数
        const storagechangefn = (e: CustomEventInit) => {
            if (e.detail && e.detail.dbname === this.dbname && e.detail.uuid !== this.uuid) {
                this.synchrodata(false)
            }
        }

        window.addEventListener('storage', storagefn)
        window.addEventListener(`${this.dbtype}storagechange`, storagechangefn)

        // 初始化销毁函数
        this.destroy = function () {
            this.data = {}
            window.removeEventListener('storage', storagefn)
            window.removeEventListener(`${this.dbtype}storagechange`, storagechangefn)
        }
    }

    /**
     * 同步当前实例与 Storage 中的数据
     * @param isSave true: 将实例缓存保存到 Storage 中；false: 将 Storage 中数据同步到当前实例中
     */
    public synchrodata(isSave: boolean = true) {
        if (isSave) {
            // 将当前实例中的数据保存到缓存中
            this.storage.setItem(this.dbname, JSON.stringify(this.data))
        } else {
            // 将缓存中的数据同步到当前实例中
            const data = this.storage.getItem(this.dbname)
            if (data && /^\{.*\}$/.test(data)) {
                this.data = JSON.parse(data)
            } else {
                this.data = {}
            }
        }
    }

    /**
     * 判断缓存中是否包含该键名
     * @param key 键名
     */
    public has(key: string) {
        return key in this.data
    }

    /**
     * 获取指定键名的数据
     * @param key 键名
     */
    public get(key: string) {
        if (this.has(key)) {
            return this.data[key]
        }
        return null
    }

    /**
     * 设置值
     * @param key 键名
     * @param value 值
     */
    public set(key: string, value: any) {
        this.data[key] = value
        this.synchrodata(true)
        this.dispatch()
        return this
    }

    /**
     * 删除指定键名数据
     * @param key 需要被删除的键
     */
    public remove(key: string) {
        if (this.has(key)) {
            delete this.data[key]
            this.synchrodata(true)
            this.dispatch()
        }
        return this
    }

    /**
     * 清除数据
     */
    public clear() {
        this.data = {}
        this.storage.removeItem(this.dbname)
        this.dispatch()
        return this
    }

    /**
     * 发布自定义 storage change 事件
     * @param data 自定义事件中的自定义数据
     */
    public dispatch() {
        const event = new CustomEvent(`${this.dbtype}storagechange`, {
            bubbles: true,
            cancelable: true,
            detail: {
                dbname: this.dbname,
                uuid: this.uuid,
            },
        })
        window.dispatchEvent(event)
    }

    /**
     * 快捷创建 sessionStorage 类型数据库管理器实例
     * @param dbname 数据库名称
     */
    public static session(dbname?: string) {
        return new Store('session', dbname)
    }

    /**
     * 快捷创建 localStorage 类型数据库管理器实例
     * @param dbname 数据库名称
     */
    public static local(dbname?: string) {
        return new Store('local', dbname)
    }
}
