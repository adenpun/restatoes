import * as React from "react";
import { useGlobalState } from "../../lib";

const Reseter: React.FC = () => {
    const [, setCount] = useGlobalState<number>("counter");

    return <button onClick={() => setCount(0)}>Reset</button>;
};

export default Reseter;
