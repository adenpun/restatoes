import * as React from "react";
import { getValue, setProp, setValue } from "./StatesProvider";
import StoreContext from "./StoreContext";
import type { InternalState, SubsFunction } from "./types";
import { isFunction } from "./utils";

export function useGlobalState<T>(stateName: string): [T, InternalState<T>["set"]] {
    const context = React.useContext(StoreContext);
    const state: InternalState<T> = context[stateName];

    const [stateValue, setStateValue] = React.useState<T>(state.value);

    const setter = React.useCallback<InternalState<T>["set"]>(
        (value) => {
            setValue<T>(state.name, (originalValue) => {
                if (isFunction(value)) value = value(originalValue);
                return value;
            });
            return;
        },
        [stateValue]
    );

    const onUpdate = React.useCallback<SubsFunction<T>>((state) => {
        setStateValue(state.value);
    }, []);

    React.useEffect(() => {
        setProp(state.name, "subs", (a) => {
            return [...a.subs, onUpdate];
        });

        return () => {
            setProp(state.name, "subs", (state) => {
                return state.subs.filter((v) => v !== onUpdate);
            });
        };
    }, []);

    return [stateValue, setter];
}
