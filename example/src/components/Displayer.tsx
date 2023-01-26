import React from "react";
import { useGlobalState } from "restatoes";

const Displayer: React.FC = () => {
    const [count] = useGlobalState<number>("counter");

    return <h2>Count is {count}</h2>;
};

export default Displayer;
