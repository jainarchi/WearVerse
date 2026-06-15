import axios from "axios";


const api = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}/api`,
    withCredentials : true
})


export async function setUserAddresses ({label , addressLine , city , state , pincode}) {
    const response = await api.patch('/account/address/add' , {label , addressLine , city , state , pincode})
    return response.data
}


export async function deleteUserAddress (addressId) {
    const response = await  api.delete(`/account/address/${addressId}`)
    return response.data
}



export async function setPassword (password) {
    const response = await api.post('/account/set-password', { password })
    return response.data
}


export async function changePassword ({currentPassword, newPassword}) {
    const response = await api.post('/account/change-password', { currentPassword, newPassword })
    return response.data
}



export async function getStates(){
    const response = await api.get('/location/states')
    return response.data
}



export async function getCities(state){
    const response = await api.get(`/location/cities/${encodeURIComponent(state)}`)
    return response.data
}

