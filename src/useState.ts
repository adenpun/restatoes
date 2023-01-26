import React from "react";
import StoreContext from "./StoreContext";
import type { InternalState, SetterArg, SubsFunction } from "./types";

export function useGlobalState<T>(state: string) {
    const context = React.useContext(StoreContext);
    return useGlobalState2<T>(context[state]);
}

function useGlobalState2<T>(state: InternalState<T>): [T, InternalState<T>["set"]] {
    const [state2, setState2] = React.useState<T>(state.value);

    const setter = React.useCallback(
        (value: SetterArg<T>) => {
            const isFunction = (v: any): v is Function => {
                if (typeof v === "function") return true;
                return false;
            };
            console.log(state.value);
            if (isFunction(value)) value = value(state.value);
            console.log(value);
            state.set?.(value);
        },
        [state.set]
    );

    const onUpdate: SubsFunction<T> = React.useCallback((state: InternalState<T>) => {
        setState2(state.value!);
    }, []);

    React.useEffect(() => {
        if (!Array.isArray(state.subs)) state.subs = [];
        state.subs.push(onUpdate);
        return () => {
            state.subs = state.subs.filter((v) => v !== onUpdate);
        };
    }, []);

    return [state2, setter];
}
