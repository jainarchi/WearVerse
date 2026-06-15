import axios from "axios";


const cartApi = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}/api/cart`,
    withCredentials : true
})




export async function addToCart ({productId , variantId , quantity}){
    const response = await cartApi.post(`/add/${productId}/${variantId}` , {quantity})
    return response.data

}


export async function getCartItems (){
    const response = await cartApi.get('/')
    return response.data
}




export async function removeItemFromCart (itemId){
    const response = await cartApi.patch(`/remove/${itemId}`)
    return response.data
}



export async function incrementCartItemQuantity(itemId) {
    const response = await cartApi.patch(`/quantity/increment/${itemId}`)
    return response.data
    
}


export async function decrementCartItemQuantity(itemId) {
    const response = await cartApi.patch(`/quantity/decrement/${itemId}`)
    return response.data    

}


export async function createCartOrder () {
    const response = await cartApi.post('/payment/create/order')
    return response.data
    
}


export async function verifyCartOrder ({ razorpay_order_id, razorpay_payment_id, razorpay_signature , addressId}) {
    const response = await cartApi.post('/payment/verify/order' , { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        addressId
    })

    return response.data
}

