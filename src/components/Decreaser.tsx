import * as React from "react";
import { useGlobalState } from "../../lib";

const Decreaser: React.FC = () => {
    const [, setCount] = useGlobalState<number>("counter");

    return <button onClick={() => setCount((count) => count - 1)}>Decrease</button>;
};

export default Decreaser;
