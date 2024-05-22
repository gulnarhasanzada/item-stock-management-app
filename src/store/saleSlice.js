import { createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../util/ErrorMessages";
import { getAuthToken } from "../util/LocalStorage";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const saleSlice = createSlice({
    name: 'sales',
    initialState:{
        sales: []
    },
    reducers:{
        setSales(state, actions){
            state.sales = actions.payload
        },
        addSale(state, actions){
            state.sales.push(actions.payload)
        },
        deleteSale(state, actions){
            state.sales = state.sales.filter(item=>item.id !== actions.payload)
        },
        updateSale(state, actions){
            state.sales = state.sales.map(item=>{
                return item.id === actions.payload.id ? actions.payload : item;
            })
        },
    }
})

export const getSales = ()=>{
    return async(dispatch)=>{
        try {
            const res = await axios.get(`${url}/stock/sales/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                dispatch(saleSlice.actions.setSales(res.data))
            }  
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const createSale = (newSale)=>{
    console.log(newSale)
    return async (dispatch)=>{
        try { 
            const res = await axios.post(`${url}/stock/sales/`, newSale,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 201){
                toast.success("Sale is created successfully!")
                dispatch(saleSlice.actions.addSale(res.data))
            }    
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const editSale= (sale)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.patch(`${url}/stock/sales/${sale.id}/`,
            sale,
            {
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                toast.success("Sale is updated successfully!")
                dispatch(saleSlice.actions.updateSale(res.data))
            } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const removeSale= (id) => {
    return async (dispatch)=>{
        try {
            const res = await axios.delete(`${url}/stock/sales/${id}/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })

           if(res.status === 204){
                toast.success("Sale is deleted successfully!")
                dispatch(saleSlice.actions.deleteSale(id))
           } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export default saleSlice.reducer;