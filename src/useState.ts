import React from "react";
import { setProp, setValue } from "./StatesProvider";
import StoreContext from "./StoreContext";
import type { InternalState, SetterArg, SubsFunction } from "./types";

export function useGlobalState<T>(stateName: string): [T, InternalState<T>["set"]] {
    const context = React.useContext(StoreContext);
    const state: InternalState<T> = context[stateName];

    const [state2, setState2] = React.useState<T>(state.value);

    const setter = React.useCallback<InternalState<T>["set"]>((value) => {
        if (isFunction(value)) value = value(state.value);
        setValue(state.name, value);
        return;
    }, []);

    const onUpdate = React.useCallback<SubsFunction<T>>((state) => {
        console.log(state);
        setState2(state.value);
    }, []);

    React.useEffect(() => {
        setProp(state.name, "subs", [...state.subs, onUpdate]);

        return () => {
            console.log(state.subs);
            setProp(
                state.name,
                "subs",
                state.subs.filter((v) => v !== onUpdate)
            );
        };
    }, []);

    return [state2, setter];
}

const isFunction = (value: any): value is Function => {
    if (typeof value === "function") return true;
    return false;
};
