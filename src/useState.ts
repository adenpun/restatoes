import React from "react";
import StoreContext from "./StoreContext";
import type { State2, SubsFunction } from "./types";

export function useGlobalState<T>(state: string) {
    const context = React.useContext(StoreContext);
    return useGlobalState2<T>(context[state]);
}

function useGlobalState2<T>(state: State2<T>): [T, State2<T>["set"]] {
    const [state2, setState2] = React.useState<T>(state.value);

    const setter = React.useCallback(
        (value: T) => {
            state.set?.(value);
        },
        [state.set]
    );

    const onUpdate: SubsFunction<T> = React.useCallback((state: State2<T>) => {
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
