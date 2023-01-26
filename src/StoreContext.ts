import React from "react";
import type { InternalStateCollection } from "./types";

const context = React.createContext<InternalStateCollection>({});

export default context;
