import React from "react";

export class Store<T> {
    public constructor(initialState: T) {
        React.createContext(initialState);
    }
}

interface StoreProviderProps {
    children?: any;
}

const StoreProvider: React.FC<StoreProviderProps> = (props) => {
    React.useEffect(() => {}, []);

    return <>{props.children}</>;
};

export default StoreProvider;

export function useGlobalState() {
    console.log("asd");
}
