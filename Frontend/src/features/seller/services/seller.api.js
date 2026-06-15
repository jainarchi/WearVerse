import axios from "axios";


const sellerApi = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}/api/seller`,
    withCredentials : true
})



export const getSellerSubOrders = async () => {
    const response = await sellerApi.get('/orders')
    return response.data
}


export const createProduct = async (formData) => {
    const response = await sellerApi.post('/create-product' , formData)
    return response.data
}


// get all products made by seller and show on seller dashboard
export async function getAllProductsBySeller (){
    const response = await sellerApi.get('/products')
    return response.data
  
}
export async function deleteProduct (productId){
    const response = await sellerApi.delete(`/products/${productId}`)
    return response.data
}


export async function addProductVariant(productId , formData){
    const response = await sellerApi.post(`/products/${productId}/variants` , formData)
    return response.data
}

