import React from "react";
import ReactDOM from "react-dom/client";
import { setValue, StatesProvider } from "restatoes";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <StatesProvider
            states={{
                counter: {
                    initialValue: 0,
                    onChange: (value) => {
                        document.title = value;
                        setValue("showTip", true);
                    },
                },
                showTip: {
                    initialValue: false,
                    onChange: (value) => {
                        console.log("changed");
                    },
                },
            }}
        >
            <App />
        </StatesProvider>
    </React.StrictMode>
);
