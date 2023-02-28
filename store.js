import { configureStore } from "@reduxjs/toolkit";
import baseSlice from "./slices/baseSlice";

export const store = configureStore({
    reducer: {
        base: baseSlice
    }
})