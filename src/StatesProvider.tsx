import React from "react";
import StoreContext from "./StoreContext";
import type { InternalState, InternalStateCollection, SetterArg, StateCollection } from "./types";
import { isFunction } from "./utils";

export interface StoreProviderProps {
    children: any;
    states: StateCollection;
}

export let setValue = <T,>(state: string, value: T) => {};
export let setProp = <Type, ReturnType>(
    state: string,
    prop: keyof InternalState<Type>,
    value: SetterArg<ReturnType, InternalState<Type>>
) => {};

export const StatesProvider: React.FC<StoreProviderProps> = (props) => {
    const parentContext = React.useContext(StoreContext);

    const defaultStates: InternalStateCollection = { ...parentContext, ...props.states } as any;

    const [states, setStates] = React.useState(() => {
        // push  =  ()->{}
        setProp = (state, prop, value) => {
            setStates((originalState) => {
                if (isFunction(value)) value = value(originalState[state]);
                return Object.assign(originalState, {
                    [state]: {
                        ...originalState[state],
                        [prop]: value,
                    },
                });
            });
        };
        setValue = (state, value) => {
            setProp(state, "value", value);
            setStates((states) => {
                states[state].subs.forEach((sub) => sub(states[state]));
                return states;
            });
        };
        return defaultStates;
    });

    React.useMemo(() => {
        Object.keys(states).forEach((state) => {
            setProp(state, "name", state);
            setProp(state, "subs", []);
            setValue(state, states[state].initialValue);
        });
    }, []);

    // React.useMemo(() => {
    //     setValue = (state, value) => {
    //         if (!defaultStates[state].set) {
    //             defaultStates[state].set = (value: SetterArg<any>) => {
    //                 const isFunction = (v: any): v is Function => {
    //                     if (typeof v === "function") return true;
    //                     return false;
    //                 };
    //                 if (isFunction(value)) value = value(defaultStates[state].value);
    //                 defaultStates[state].value = value;
    //                 console.log(defaultStates[state].value);
    //                 defaultStates[state].onChange?.(value);
    //                 defaultStates[state].subs.forEach((sub) => {
    //                     sub(defaultStates[state]);
    //                 });
    //                 return;
    //             };
    //         }
    //         defaultStates[state].set(value);
    //     };
    //     Object.keys(defaultStates).forEach((state) => {
    //         console.log(Object.keys(defaultStates));
    //         defaultStates[state].subs = [];
    //         setValue(state, defaultStates[state].initialValue);
    //     });
    // }, []);

    return <StoreContext.Provider value={states}>{props.children}</StoreContext.Provider>;
};
