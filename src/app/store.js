import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "../features/CartSlice";
import { apiSlice } from "../features/api/ApiSlice";

export const store=configureStore({
    reducer:{
        cart:CartSlice.reducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(gM)=>gM().concat(apiSlice.middleware)
})