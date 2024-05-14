import { createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../util/ErrorMessages";
import { getAuthToken } from "../util/LocalStorage";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BACKEND_URL;

const firmSlice = createSlice({
    name: "firms",
    initialState:{
       firms: [] 
    },
    reducers: {
        setFirms(state, actions){
            state.firms = actions.payload;
        },
        addFirm(state, actions){
            state.firms.push(actions.payload)
        },
        deleteFirm(state, actions){
            state.firms = state.firms.filter(item=>item.id !== actions.payload)
        },
        updateFirm(state, actions){
            state.firms = state.firms.map(item=>{
                return item.id === actions.payload.id ? actions.payload : item;
            })
        },
    }
})

export const getFirms = ()=>{
    return async(dispatch)=>{
        try {
            const res = await axios.get(`${url}/stock/firms/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                dispatch(firmSlice.actions.setFirms(res.data))
            }  
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const createFirm = (newFirm)=>{
    return async (dispatch)=>{
        try { 
            const res = await axios.post(`${url}/stock/firms/`, newFirm,{
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 201){
                toast.success("Firm is created successfully!")
                dispatch(firmSlice.actions.addFirm(res.data))
            }    
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const editFirm= (firm)=>{
    return async (dispatch)=>{
        try {
            const res = await axios.patch(`${url}/stock/firms/${firm.id}/`,
            firm,
            {
                headers: {
                    Authorization: getAuthToken()
                }
            })
            if(res.status === 200){
                toast.success("Firm is updated successfully!")
                dispatch(firmSlice.actions.updateFirm(res.data))
            } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const removeFirm= (id) => {
    return async (dispatch)=>{
        try {
            const res = await axios.delete(`${url}/stock/firms/${id}/`,{
                headers: {
                    Authorization: getAuthToken()
                }
            })

           if(res.status === 204){
                toast.success("Firm is deleted successfully!")
                dispatch(firmSlice.actions.deleteFirm(id))
           } 
        } catch (error) {
            handleApiError(error)
        }
    }
}

export default firmSlice.reducer;