export interface EventItem {
    fn: Function;
    once: boolean;
}
export declare enum EventStatus {
    NEXT = 0,
    END = 1,
    DELETE = 2,
    DELETE_AND_END = 3
}
export declare type eachcall = (value: EventItem, index: number) => EventStatus | void;
export default class Events {
    protected data: Map<string, EventItem[]>;
    protected add(type: string, data: EventItem): void;
    protected forEach(type: string, callfn: eachcall): void;
    on(type: string, fn: Function): this;
    once(type: string, fn: Function): this;
    emeit(type: string, ...args: any[]): this;
    off(type: string, offFn: Function): this;
    remove(type: string): this;
    clear(): this;
}
