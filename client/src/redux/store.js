import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authSlice from "./authSlice";
import { adminApi } from "./adminApi";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        auth: authSlice,
    },
    middleware: def => [...def(), authApi.middleware, adminApi.middleware]
})

export default reduxStore