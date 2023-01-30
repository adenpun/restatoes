import * as React from "react";
import StoreContext from "./StoreContext";
import type { InternalState, InternalStateCollection, SetterArg, StateCollection } from "./types";
import { isFunction } from "./utils";

export interface StoreProviderProps {
    children: any;
    states: StateCollection;
}

export let setValue = <Type,>(state: string, value: SetterArg<Type, Type>) => {};
export let setProp = <Type, ReturnType>(
    state: string,
    prop: keyof InternalState<Type>,
    value: SetterArg<ReturnType, InternalState<Type>>
) => {};
export let getValue = <Type,>(state: string): Type => {
    return values[state];
};

let values: Record<string, any> = {};

export const StatesProvider: React.FC<StoreProviderProps> = (props) => {
    const parentContext = React.useContext(StoreContext);

    const defaultStates: InternalStateCollection = { ...parentContext, ...props.states } as any;

    const [states, setStates] = React.useState(() => {
        // getValue = (state) => {
        //     return new Promise<any>((resolve) => {
        //         setStates((states) => {
        //             resolve(states[state].value);
        //             return states;
        //         });
        //     });
        // };

        return defaultStates;
    });

    setProp = React.useCallback(
        (state, prop, value) => {
            setStates((originalState) => {
                const passArg =
                    prop === "value" ? originalState[state].value : originalState[state];
                if (isFunction(value)) value = value(passArg);
                return Object.assign(originalState, {
                    [state]: {
                        ...originalState[state],
                        [prop]: value,
                    },
                });
            });
        },
        [setStates]
    );

    setValue = React.useCallback(
        (state, value) => {
            setProp(state, "value", value as any);
            setStates((states) => {
                values[state] = states[state].value;
                states[state].subs.forEach((sub) => sub(states[state]));
                states[state].onChange?.(states[state].value);
                return states;
            });
        },
        [setProp]
    );

    React.useMemo(() => {
        Object.keys(states).forEach((state) => {
            setProp(state, "name", state);
            setProp(state, "subs", []);
            setValue(state, states[state].initialValue);
        });
    }, []);

    return <StoreContext.Provider value={states}>{props.children}</StoreContext.Provider>;
};
