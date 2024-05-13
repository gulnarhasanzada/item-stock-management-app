import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: []
    },
    reducers:{
        setCategories(state, action){
            state.categories = action.payload
        }
    }
})

export const getCategories = () => {
    return async (dispatch)=>{
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`${url}/stock/categories/`,{
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            dispatch(categorySlice.actions.setCategories(res.data))
            
        } catch (error) {
            toast.error(error.message)
        }
    }
}

export default categorySlice.reducer;