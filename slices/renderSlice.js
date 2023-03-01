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
        },
        overrideRender: (state, action) => {
            state.renders[action.payload.index] = action.payload.image;
        },
        removeRender: (state, action) => {
            state.renders = state.renders.filter((_, index) => index !== action.payload);
        }
    }
})

export const { setLoading, setRenders, overrideRender, removeRender } = renderSlice.actions;
export const selectLoading = (state) => state.render.loading;
export const selectRenders = (state) => state.render.renders;

export default renderSlice.reducer;