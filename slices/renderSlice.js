import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    renders: [],
}

export const renderSlice = createSlice({
    name: "render",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setRenders: (state, action) => {
            state.renders = [action.payload, ...state.renders];
        }
    }
})

export const { setLoading, setRenders } = renderSlice.actions;
export const selectLoading = (state) => state.render.loading;
export const selectRenders = (state) => state.render.renders;

export default renderSlice.reducer;