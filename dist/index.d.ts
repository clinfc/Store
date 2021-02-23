import Events from './event';
declare type Data = {
    [propName: string]: any;
};
export default class Store {
    #private;
    protected storage: 'local' | 'session';
    protected namespace: string;
    events: Events;
    get data(): Data;
    get size(): number;
    constructor(storage: 'local' | 'session', namespace?: string);
    keys(): string[];
    has(key: string): boolean;
    get(key: string): any;
    gets(...keys: string[]): Data;
    only(...keys: string[]): Data;
    set(key: string, value: any): this;
    sets(data: Data): this;
    remove(...keys: string[]): this;
    clear(): this;
    destroy(): void;
    dispatch(): void;
    synchrodata(isSave?: boolean): void;
    static session(namespace?: string): Store;
    static local(namespace?: string): Store;
}
export {};
