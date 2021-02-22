/**
 * @deprecated 事件管理器
 */

/**
 * 事件项数据
 */
export interface EventItem {
    fn: Function
    once: boolean
}

export enum EventStatus {
    /** 继续循环 */
    NEXT,
    /** 终止循环 */
    END,
    /** 删除当前元素 */
    DELETE,
    /** 删除当前元素并终止循环 */
    DELETE_AND_END,
}

/**
 * 遍历事件池时的自定义回调函数
 */
export type eachcall = (value: EventItem, index: number) => EventStatus | void

export default class Events {
    /**
     * 事件池
     */
    protected data: Map<string, EventItem[]> = new Map()

    /**
     * 将事件函数相关数据保存到事件池中
     * @param type 事件类型
     * @param data 事件数据
     */
    protected add(type: string, data: EventItem) {
        if (!this.data.has(type)) {
            this.data.set(type, [])
        }
        ;(this.data.get(type) as EventItem[]).push(data)
    }

    /**
     * 遍历事件池
     * @param type 事件类型
     * @param callfn 自定义回调函数
     */
    protected forEach(type: string, callfn: eachcall) {
        if (this.data.has(type)) {
            const events = this.data.get(type) as EventItem[]
            for (let i = 0; i < events.length; i++) {
                const status = callfn(events[i], i)
                // 终止循环
                if (EventStatus.END == status) {
                    break
                }
                // 删除当前元素
                else if (EventStatus.DELETE == status) {
                    events.splice(i--, 1)
                }
                // 删除当前元素并终止循环
                else if (EventStatus.DELETE_AND_END == status) {
                    events.splice(i--, 1)
                    break
                }
            }
        }
    }

    /**
     * 绑定事件
     * @param type 事件类型
     * @param fn 事件回调
     */
    public on(type: string, fn: Function) {
        this.add(type, { fn, once: false })
        return this
    }

    /**
     * 绑定一次性事件事件
     * @param type 事件类型
     * @param fn 事件回调
     */
    public once(type: string, fn: Function) {
        this.add(type, { fn, once: true })
        return this
    }

    /**
     * 发布事件
     * @param type 事件类型
     * @param args 参数集合
     */
    public emeit(type: string, ...args: any[]) {
        this.forEach(type, ({ fn, once }) => {
            fn(...args)
            if (once) {
                return EventStatus.DELETE
            }
        })
        return this
    }

    /**
     * 事件解绑
     * @param type 事件类型
     * @param offFn 解绑的函数
     */
    public off(type: string, offFn: Function) {
        this.forEach(type, ({ fn }) => {
            if (offFn === fn) {
                return EventStatus.DELETE_AND_END
            }
        })
        return this
    }

    /**
     * 移除某一事件类型的监听
     * @param type 事件类型
     */
    public remove(type: string) {
        this.data.delete(type)
        return this
    }

    /**
     * 清除所有事件类型的监听
     */
    public clear() {
        this.data.clear()
        return this
    }
}
