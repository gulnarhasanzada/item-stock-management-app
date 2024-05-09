import {createSlice, current} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify'

const url = import.meta.env.VITE_BACKEND_URL

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: localStorage.getItem('username') || false,
        token: localStorage.getItem('token') && atob(localStorage.getItem('token')),
        first_name: '',
        last_name: '',
        email: ''
    },
    reducers: {
        auth(state, action) {
            state.currentUser = action.payload.username
            state.token = action.payload.token
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.email = action.payload.email
          },
    }
})

export const register = (userInfo, navigate) =>{
    return async (dispatch) =>{
        try {
            
            const res = await axios.post(`${url}/account/register/`, {...userInfo, password2:userInfo.password});
            if(!res.data.token) throw new Error('Something went wrong!');
            console.log(res)

            const payload = {
                token: res.data.key,
                currentUser: res.data.username,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email
            }

            dispatch(authSlice.actions.auth(payload));
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('token', res.data.key)
            localStorage.setItem('admin', res.data.is_superuser)
            localStorage.setItem('first_name', res.data.first_name)
            localStorage.setItem('last_name', res.data.last_name)
            localStorage.setItem('email', res.data.email)
            toast.success('Successfully registered!')
            navigate('/stock/dashboard')

        } catch (error) {
            toast.error(error.message)
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
                currentUser: res.data.username
            }

            dispatch(authSlice.actions.auth(payload))

            localStorage.setItem('username', res.data.username)
            localStorage.setItem('token', res.data.key)
            localStorage.setItem('admin', res.data.is_superuser)
            localStorage.setItem('first_name', res.data.first_name)
            localStorage.setItem('last_name', res.data.last_name)
            localStorage.setItem('email', res.data.email)
            toast.success('Successfully logged in!')
            navigate('/stock/dashboard')
        } catch (error) {
            toast.error(error?.response?.data?.non_field_errors[0])
        }
    }
}

export const logout = (navigate)=>{
    return async (dispatch)=>{
        try {
            const token = atob(localStorage.getItem('token'))
            const res = await axios.post(`${url}/account/auth/logout/`,{
                headers:{
                    Authorization: `Token ${token}`
                }
            })

            if(res.status === 200){
                dispatch(authSlice.actions.auth({token: false, currentUser: false}))
                localStorage.clear();
                toast.success("Successfully logged out!")
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
}

export const changePassword = (newPassword) => {
    return async (dispatch) =>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${url}/account/auth/password/change/`,{
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-type': 'application/json'
                },
                data: {
                    new_password1: newPassword,
                    new_password2: newPassword,
                }
            });
            if(res.status === 200){
                toast.success('Password changed successfully!')
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
}

export default authSlice.reducer;