export const getAuthToken =()=>{
    return `Token ${getToken()}`;
}

export const clearStorage = ()=>{
    localStorage.clearStorage();
}

export const getUsername = ()=>{
    return localStorage.getItem('username')
}

export const getAdmin = ()=>{
    return localStorage.getItem('admin')
}

export const getFirstname = ()=>{
    return localStorage.getItem('first_name')
}

export const getLastname = ()=>{
    return localStorage.getItem('last_name')
}

export const getEmail= ()=>{
    return localStorage.getItem('email')
}

export const getToken = ()=>{
    return localStorage.getItem('token')
}

export const setStorageData = (data)=>{
    localStorage.setItem('username', data.user.username)
    localStorage.setItem('token', data.key)
    localStorage.setItem('admin', data.user.is_superuser)
    localStorage.setItem('first_name', data.user.first_name)
    localStorage.setItem('last_name', data.user.last_name)
    localStorage.setItem('email', data.user.email)
}