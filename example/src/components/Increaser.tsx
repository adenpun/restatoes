import React from "react";
import { useGlobalState } from "restatoes";

const Increaser: React.FC = () => {
    const [, setCount] = useGlobalState<number>("counter");

    return (
        <button
            onClick={() => {
                setCount((count) => {
                    console.log(count);
                    return count + 1;
                });
                setCount((count) => {
                    console.log(count);
                    return count - 1;
                });
            }}
        >
            Increase
        </button>
    );
};

export default Increaser;
