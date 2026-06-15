import { getProductDetails, getAllProducts } from "../services/products.api.js"
import {
    setAllProducts,
    setLoading,
    setError,
    clearError,
} from "../state/products.slice.js"
import { useDispatch } from "react-redux"


export const useProducts = () => {
    const dispatch = useDispatch()


    // get all products to show on home page

    const handleGetAllProducts = async () => {
        dispatch(setLoading({ key: "allProducts", value: true }))

        try {
            const data = await getAllProducts()
            dispatch(setAllProducts(data.products))
        } catch (err) {
            dispatch(setError({ key: "allProducts", value: err?.response?.message || "Something went wrong" }))
        } finally {
            dispatch(setLoading({ key: "allProducts", value: false }))
        }
    }


    const handleGetProductDetails = async (productId) => {
        const data = await getProductDetails(productId)
        return data.product
    }



    return {
        handleGetProductDetails,
        handleGetAllProducts,
        clearError
    }
}