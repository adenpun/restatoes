import React from "react";
import StoreContext from "./StoreContext";
import type { StateCollection, State2Collection } from "./types";

export interface StoreProviderProps {
    children: any;
    states: StateCollection;
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
    const parentContext = React.useContext(StoreContext);

    const states: State2Collection = { ...parentContext, ...props.states } as any;

    React.useMemo(() => {
        Object.keys(states).forEach((state) => {
            states[state].value = states[state].initialValue;
            states[state].set = (value) => {
                states[state].value = value;
                states[state].subs.forEach((sub) => {
                    sub(states[state]);
                });
                return;
            };
        });
    }, []);

    return <StoreContext.Provider value={states}>{props.children}</StoreContext.Provider>;
};
