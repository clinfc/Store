declare type Data = {
    [propName: string]: any;
};
export default class Store {
    #private;
    private dbtype;
    private dbname;
    destoryfn: Function[];
    get data(): Data;
    constructor(dbtype: 'local' | 'session', dbname?: string);
    synchrodata(isSave?: boolean): void;
    has(key: string): boolean;
    get(key: string): any;
    set(key: string, value: any): this;
    remove(key: string): this;
    clear(): this;
    destroy(): void;
    dispatch(): void;
    static session(dbname?: string): Store;
    static local(dbname?: string): Store;
}
export {};
