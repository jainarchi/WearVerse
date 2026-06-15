import axios from "axios";


const wishlistApi = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}/api/wishlist`,
    withCredentials : true
})


export async function getWishlist () {
    const response = await wishlistApi.get('/')
    return response.data
}


export async function toggleProductInWishlist (productId) {
    const response = await wishlistApi.post(`/${productId}`)
    return response.data
}