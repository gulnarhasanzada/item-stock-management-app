import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoriesReducer from './categorySlice'
import { uiReducer } from "./uiSlice";
import brandsReducer from "./brandSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        ui: uiReducer,
        categories: categoriesReducer,
        brands: brandsReducer
    }
})

export default store