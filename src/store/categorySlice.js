import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {handleApiError} from '../util/ErrorMessages'

const url = import.meta.env.VITE_BACKEND_URL;

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: []
    },
    reducers:{
        setCategories(state, action){
            state.categories = action.payload
        },
        updateCategory(state, action){
            const updatedCategory = action.payload;
            state.categories = state.categories.map(category=> {
                return category.id === updatedCategory.id ? updatedCategory : category;
            })
        },
        addCategory(state, action){
            state.categories.push(action.payload)
        },
        deleteCategory(state, action){
            state.categories = state.categories.filter(item=> item.id !== action.payload)
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
            handleApiError(error)
        }
    }
}

export const createCategory = (categoryName)=>{
    return async (dispatch)=>{
        try {
            const token = localStorage.getItem('token');
            const newCategory = {
                name: categoryName,
                product_count: 0
            }
            const res = await axios.post(`${url}/stock/categories/`, newCategory,{
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            dispatch(categorySlice.actions.addCategory(res.data))
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const editCategory = (category)=>{
    return async (dispatch)=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.patch(`${url}/stock/categories/${category.id}/`,
            {
                name: category.name
            },
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            dispatch(categorySlice.actions.updateCategory(category))
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const removeCategory= (id) => {
    return async (dispatch)=>{
        try {
            const token = localStorage.getItem('token')
            const res = await axios.delete(`${url}/stock/categories/${id}/`,{
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            dispatch(categorySlice.actions.deleteCategory(id))
            
        } catch (error) {
            handleApiError(error)
        }
    }
}

export default categorySlice.reducer;