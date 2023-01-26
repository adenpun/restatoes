![ReStatoes banner](./media/banner.png)

# ReStatoes

a easy global state thing

## Example (Typescript)

```tsx
import React from "react";
import * as ReStatoes from "restatoes";

const CounterStates: ReStatoes = {
    initialValue: 0,
};

const App: React.FC = () => {
    return (
        <ReStatoes.StatesProvider
            states={{
                CounterStates,
            }}
        >
            <Displayer />
        </ReStatoes.StatesProvider>
    );
};

const Displayer: React.FC = () => {
    const [state] = ReStatoes.useGlobalState("CounterStates");

    return <h1>{state}</h1>;
};

const Button: React.FC = () => {
    const [, setState] = ReStatoes.useGlobalState("CounterStates");
    return (
        <button
            onClick={() => {
                setState();
            }}
        >
            Press me!
        </button>
    );
};
```
