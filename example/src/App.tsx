import React from "react";
import { useGlobalState } from "restatoes";

import Decreaser from "./components/Decreaser";
import Displayer from "./components/Displayer";
import Increaser from "./components/Increaser";
import Reseter from "./components/Reseter";

function App() {
    const [changed] = useGlobalState<boolean>("changed");

    React.useEffect(() => {
        console.log(changed);
    });
    return (
        <>
            <h1>ReStatoes Demo</h1>
            {changed ? <h6>The document title is changing too!</h6> : <></>}
            <Displayer />
            <Decreaser />
            <Reseter />
            <Increaser />
        </>
    );
}

export default App;
