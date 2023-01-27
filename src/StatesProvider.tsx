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

    return <StoreContext.Provider value={states}>{props.children}</StoreContext.Provider>;
};
