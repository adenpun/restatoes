import type React from "react";

export type Setter<T> = (value: SetterArg<T>) => void;

export type SetterArg<Type, Para = Type> = ((value: Para) => Type) | Type;

export type SubsFunction<T> = (state: InternalState<T>) => void;

export type State<T> = {
    initialValue: T;
    onChange?: (value: T) => void;
};

export type StateCollection = { [key: string]: State<any> };

export type InternalState<T> = State<T> & {
    value: T;
    name: string;
    set: Setter<T>;
    subs: SubsFunction<T>[];
};

export type InternalStateCollection = { [key: string]: InternalState<any> };

export type KeyOfInternalStateCollection = keyof React.Context<InternalStateCollection>;
