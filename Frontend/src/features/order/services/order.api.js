import axios from 'axios';


const orderApi = axios.create({
    baseURL : '/api',
    withCredentials : true
})



export async function getUserOrders () {
    const response = await orderApi.get('/orders')
    return response.data 
}


export async function getOrderDetails (orderId) {
    const response = await orderApi.get(`/orders/${orderId}`)
    return response.data 
}


export async function getOrderConfirmed (orderId) {
    const response = await orderApi.get(`/orders/confirmed/${orderId}`)
    return response.data
}


