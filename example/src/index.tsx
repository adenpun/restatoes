import * as React from "react";
import * as ReactDOM from "react-dom/client";
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
                        setValue<number>("numberOfChange", (original) => original + 1);
                    },
                },
                numberOfChange: {
                    initialValue: 0,
                },
            }}
        >
            <App />
        </StatesProvider>
    </React.StrictMode>
);
