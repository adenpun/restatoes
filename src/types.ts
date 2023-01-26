export type Setter<T> = (value: SetterArg<T>) => void;

export type SetterArg<T> = ((value: T) => T) | T;

export type SubsFunction<T> = (state: InternalState<T>) => void;

export type State<T> = {
    initialValue: T;
};

export type StateCollection = { [key: string]: State<any> };

export type InternalState<T> = State<T> & {
    value: T;
    set: Setter<T>;
    subs: SubsFunction<T>[];
};

export type InternalStateCollection = { [key: string]: InternalState<any> };
