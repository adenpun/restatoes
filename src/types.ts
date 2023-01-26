export type State<T> = {
    initialValue: T;
};

export type SubsFunction<T> = (state: State2<T>) => void;

export type State2<T> = State<T> & {
    value: T;
    set: (value: T) => void;
    subs: SubsFunction<T>[];
};

export type StateCollection = { [key: string]: State<any> };
export type State2Collection = { [key: string]: State2<any> };
