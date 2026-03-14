import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "../features/CartSlice";

export const store=configureStore({
    reducer:{
        product:CartSlice.reducer
    }
})