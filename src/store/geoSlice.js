import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError } from "../util/ErrorMessages";
import {setKey, setLanguage, fromAddress, setLocationType} from 'react-geocode'

setKey('AIzaSyD8IPCxZZMLEmwmGb02HXPb6RsdJ8EMvk8')
setLanguage('en')
setLocationType('ROOFTOP')

const geoSlice = createSlice({
    name: 'geo',
    initialState: {
        lat: null,
        lng: null
    },
    reducers:{
        setCoordinates(state, actions){
            console.log(actions.payload)
            state.lat = actions.payload.lat;
            state.lng = actions.payload.lng;
        }
    }
})

export const getCoordinates = (address)=>{
    return async (dispatch)=>{
        try {
            const res = await fromAddress(address)
            
            if(res.status==='OK'){
                const payload = res.results[0].geometry.location;
                dispatch(geoSlice.actions.setCoordinates(payload))
            }
        } catch (error) {
            handleApiError(error)
        }
    }
}

export default geoSlice.reducer