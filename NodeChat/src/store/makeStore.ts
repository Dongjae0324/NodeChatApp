import { createStore } from "redux";
import { rootReducer } from "./rootReducer";

export const generateStore = () => {
    const store = createStore(rootReducer) 
    return store
}

