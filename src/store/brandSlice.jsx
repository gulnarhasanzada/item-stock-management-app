import { createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../util/ErrorMessages";
import { getAuthToken } from "../util/LocalStorage";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const brandSlice = createSlice({
    name: "brands",
    initialState:{
       brands: [] 
    },
    reducers: {
        setBrands(state, actions){
            state.brands = actions.payload;
        },
        addBrand(state, actions){
            state.brands.push(actions.payload)
        },
        deleteBrand(state, actions){
            state.brands = state.brands.filter(item=>item.id !== actions.payload)
        },
        updateBrand(state, actions){
            state.brands = state.brands.map(item=>{
                return item.id === actions.payload.id ? actions.payload : item;
            })
        },
    }
})

export const getBrands = ()=>{
    return async(dispatch)=>{
        try {
            const res = await axios.get(`${url}/stock/brands/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                dispatch(brandSlice.actions.setBrands(res.data))
            }  
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const createBrand = (newBrand)=>{
    return async (dispatch)=>{
        try { 
            const res = await axios.post(`${url}/stock/brands/`, newBrand,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 201){
                toast.success("Brand is created successfully!")
                dispatch(brandSlice.actions.addBrand(res.data))
            }    
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const editBrand= (brand)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.patch(`${url}/stock/brands/${brand.id}/`,
            brand,
            {
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                toast.success("Brand is updated successfully!")
                dispatch(brandSlice.actions.updateBrand(res.data))
            } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const removeBrand= (id) => {
    return async (dispatch)=>{
        try {
            const res = await axios.delete(`${url}/stock/brands/${id}/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })

           if(res.status === 204){
                toast.success("Brand is deleted successfully!")
                dispatch(brandSlice.actions.deleteBrand(id))
           } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export default brandSlice.reducer;