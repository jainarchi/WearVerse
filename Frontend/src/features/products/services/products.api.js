import axios from "axios";


const productApi = axios.create({
    baseURL : '/api/products',
    withCredentials : true
})



// get all products to show on home page
export async function getAllProducts() {
    const response = await productApi.get('/')
    return response.data
    
}



// get product details by id 

export async function getProductDetails(productId){
    const response = await productApi.get(`/${productId}/details`)
    return response.data
}





