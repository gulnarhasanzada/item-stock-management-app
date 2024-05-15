import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoriesReducer from './categorySlice'
import { uiReducer } from "./uiSlice";
import brandsReducer from "./brandSlice";
import firmsReducer from "./firmSlice";
import productReducer from "./productSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        ui: uiReducer,
        categories: categoriesReducer,
        brands: brandsReducer,
        firms: firmsReducer,
        products: productReducer
    }
})

export default store