import { createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../util/ErrorMessages";
import { getAuthToken } from "../util/LocalStorage";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const purchaseSlice = createSlice({
    name: 'purchases',
    initialState:{
        purchases: []
    },
    reducers:{
        setPurchases(state, actions){
            state.purchases = actions.payload
        },
        addPurchase(state, actions){
            state.purchases.push(actions.payload)
        },
        deletePurchase(state, actions){
            state.purchases = state.purchases.filter(item=>item.id !== actions.payload)
        },
        updatePurchase(state, actions){
            state.purchases = state.purchases.map(item=>{
                return item.id === actions.payload.id ? actions.payload : item;
            })
        },
    }
})

export const getPurchases = ()=>{
    return async(dispatch)=>{
        try {
            const res = await axios.get(`${url}/stock/purchases/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                dispatch(purchaseSlice.actions.setPurchases(res.data))
            }  
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const createPurchase = (newPurchase)=>{
    return async (dispatch)=>{
        try { 
            const res = await axios.post(`${url}/stock/purchases/`, newPurchase,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 201){
                toast.success("Purchase is created successfully!")
                dispatch(purchaseSlice.actions.addPurchase(res.data))
            }    
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const editPurchase= (purchase)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.patch(`${url}/stock/purchases/${purchase.id}/`,
            purchase,
            {
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                toast.success("Purchase is updated successfully!")
                dispatch(purchaseSlice.actions.updatePurchase(res.data))
            } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const removePurchase= (id) => {
    return async (dispatch)=>{
        try {
            const res = await axios.delete(`${url}/stock/purchases/${id}/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })

           if(res.status === 204){
                toast.success("Purchase is deleted successfully!")
                dispatch(purchaseSlice.actions.deletePurchase(id))
           } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export default purchaseSlice.reducer;