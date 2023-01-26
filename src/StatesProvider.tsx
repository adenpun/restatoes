import React from "react";
import StoreContext from "./StoreContext";
import type { StateCollection, InternalStateCollection, SetterArg } from "./types";

export interface StoreProviderProps {
    children: any;
    states: StateCollection;
}

export let setValue = <T,>(states: string, value: T) => {};

export const StatesProvider: React.FC<StoreProviderProps> = (props) => {
    const parentContext = React.useContext(StoreContext);

    const states: InternalStateCollection = { ...parentContext, ...props.states } as any;

    React.useMemo(() => {
        setValue = (state, value) => {
            if (!states[state].set) {
                states[state].set = (value: SetterArg<any>) => {
                    const isFunction = (v: any): v is Function => {
                        if (typeof v === "function") return true;
                        return false;
                    };
                    if (isFunction(value)) value = value(states[state].value);
                    states[state].value = value;
                    console.log(states[state].value);
                    states[state].onChange?.(value);
                    states[state].subs.forEach((sub) => {
                        sub(states[state]);
                    });
                    return;
                };
            }
            states[state].set(value);
        };
        Object.keys(states).forEach((state) => {
            console.log(Object.keys(states));
            states[state].subs = [];
            setValue(state, states[state].initialValue);
        });
    }, []);

    return <StoreContext.Provider value={states}>{props.children}</StoreContext.Provider>;
};
