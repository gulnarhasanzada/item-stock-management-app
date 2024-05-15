import { createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../util/ErrorMessages";
import { getAuthToken } from "../util/LocalStorage";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const productSlice = createSlice({
    name: 'products',
    initialState:{
        products: []
    },
    reducers:{
        setProducts(state, actions){
            state.products = actions.payload
        },
        addProduct(state, actions){
            state.products.push(actions.payload)
        },
        deleteProduct(state, actions){
            state.products = state.products.filter(item=>item.id !== actions.payload)
        },
        updateProduct(state, actions){
            state.products = state.products.map(item=>{
                return item.id === actions.payload.id ? actions.payload : item;
            })
        },
    }
})

export const getProducts = ()=>{
    return async(dispatch)=>{
        try {
            const res = await axios.get(`${url}/stock/products/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                dispatch(productSlice.actions.setProducts(res.data))
            }  
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const createProduct = (newProduct)=>{
    return async (dispatch)=>{
        try { 
            const res = await axios.post(`${url}/stock/products/`, newProduct,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 201){
                toast.success("Product is created successfully!")
                dispatch(productSlice.actions.addProduct(res.data))
            }    
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const editProduct= (product)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.patch(`${url}/stock/products/${product.id}/`,
            product,
            {
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                toast.success("Product is updated successfully!")
                dispatch(productSlice.actions.updateProduct(res.data))
            } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const removeProduct= (id) => {
    return async (dispatch)=>{
        try {
            const res = await axios.delete(`${url}/stock/products/${id}/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })

           if(res.status === 204){
                toast.success("Product is deleted successfully!")
                dispatch(productSlice.actions.deleteProduct(id))
           } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export default productSlice.reducer;