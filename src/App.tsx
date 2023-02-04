import * as React from "react";
import { useGlobalState } from "../lib";

import Decreaser from "./components/Decreaser";
import Displayer from "./components/Displayer";
import Increaser from "./components/Increaser";
import Reseter from "./components/Reseter";

function App() {
    const [numberOfChange] = useGlobalState<number>("numberOfChange");

    return (
        <>
            <h1>ReStatoes Demo</h1>
            {numberOfChange > 1 && numberOfChange < 11 ? (
                <h3 style={{ position: "absolute", left: "0", top: "0" }}>
                    The document title is changing too!
                </h3>
            ) : (
                <></>
            )}
            <Displayer />
            <Decreaser />
            <Reseter />
            <Increaser />
        </>
    );
}

export default App;
