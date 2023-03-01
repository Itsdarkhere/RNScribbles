import { configureStore } from "@reduxjs/toolkit";
import renderSlice from "./slices/renderSlice";

export const store = configureStore({
    reducer: {
        render: renderSlice
    }
})