import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
}

export const baseSlice = createSlice({
    name: "base",
    initialState,
    reducers: {
        setBase: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setBase } = baseSlice.actions;
export const selectBase = (state) => state.base.value;

export default baseSlice.reducer;