import {createSlice, current} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify'
import { getAuthToken, getEmail, getFirstname, getLastname, getToken, getUsername, setStorageData } from '../util/LocalStorage';
import { handleApiError } from '../util/ErrorMessages';

const url = import.meta.env.VITE_BACKEND_URL

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: getUsername() || '',
        token: getToken() || '',
        first_name: getFirstname()|| '',
        last_name: getLastname() || '',
        email: getAdmin() === 'true',
    },
    reducers: {
        auth(state, action) {
            state.currentUser = action.payload.username
            state.token = action.payload.token
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
            state.admin = action.payload.is_superuser
          },
    }
})

export const register = (userInfo, navigate) =>{
    return async (dispatch) =>{
        try {  
            const res = await axios.post(`${url}/account/register/`, {...userInfo, password2:userInfo.password});
            if(!res.data.user.token) throw new Error('Something went wrong!');

            const payload = {
                token: res.data.key,
                username: res.data.user.username,
                first_name: res.data.user.first_name,
                last_name: res.data.user.last_name,
                email: res.data.user.email,
                admin: res.data.user.is_superuser
            }

            dispatch(authSlice.actions.auth(payload));
            setStorageData(res.data)
            toast.success('Successfully registered!')
            navigate('/stock/dashboard')

        } catch (error) {
            handleApiError(error)
        }
    }
}

export const login = (userInfo, navigate) =>{
    return async (dispatch) => {
        try {
            const res = await axios.post(`${url}/account/auth/login/`, userInfo)
            if(!res.data.key) throw new Error('Something went wrong!')
            
            const payload = {
                token: res.data.key,
                username: res.data.user.username,
                first_name: res.data.user.first_name,
                last_name: res.data.user.last_name,
                email: res.data.user.email,
                admin: res.data.user.is_superuser
            }

            dispatch(authSlice.actions.auth(payload))
            setStorageData(res.data)
            toast.success('Successfully logged in!')
            navigate('/stock/dashboard')
        } catch (error) {
            toast.error(error?.response?.data?.non_field_errors[0])
        }
    }
}

export const logout = (navigate)=>{ 
    return async(dispatch)=>{
        try {
            const res = await axios.post(`${url}/account/auth/logout/`)
            if(res.status === 200){
                const payload = {
                    token: '',
                    username: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    admin: false
                }
                dispatch(authSlice.actions.auth(payload))
                localStorage.clear();
                toast.success("Successfully logged out!")
                navigate("/")
            }
        } catch (error) {
            handleApiError(error)
        }
    }
}

export const changePassword = (newPassword) => {
    return async (dispatch) =>{
        try {
            const res = await axios.post(`${url}/account/auth/password/change/`,
                {
                    "new_password1": newPassword,
                    "new_password2": newPassword,
                },
                {
                    headers: {
                        Authorization: getAuthToken(),
                        'Content-type': 'application/json'
                    },
                }
                
            );
            if(res.status === 200){
                toast.success('Password changed successfully!')
            }
        } catch (error) {
            handleApiError(error)
        }
    }
}

export default authSlice.reducer;