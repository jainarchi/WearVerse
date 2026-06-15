import { getSellerSubOrders } from "../services/seller.api.js";
import {
    setSellerSubOrders,
    setLoading,
    setSellerProducts,
    addSellerProduct,
    removeSellerProduct,
} from "../state/seller.slice.js";
import { useDispatch } from "react-redux";
import {
    createProduct,
    getAllProductsBySeller,
    deleteProduct,
    addProductVariant,
} from "../services/seller.api.js";

export const useSeller = () => {
    const dispatch = useDispatch();



    const handleGetSellerSubOrders = async () => {
        try {
            dispatch(setLoading({ type: "subOrders", value: true }));
            const data = await getSellerSubOrders();
            dispatch(setSellerSubOrders(data.orders));
            return {
                success: true,
                orders: data.orders,
            };
        } catch (err) {
            return {
                success: false,
                message: err.response.data.message || "Something went wrong",
            };
        } finally {
            dispatch(setLoading({ type: "subOrders", value: false }));
        }
    };



    const handleGetAllProductsBySeller = async () => {
        try {
            const data = await getAllProductsBySeller();
            dispatch(setSellerProducts(data.products));
        } catch (err) {
            return {
                status: false,
                message: err.response.data.message || "Something went wrong",
            };
        }
    };




    const handleCreateProduct = async (formData) => {
        try {
            const data = await createProduct(formData);
            dispatch(addSellerProduct(data.product));
            return data.product;
        } catch (err) {
            return {
                status: false,
                message: err.response.data.message || "Something went wrong",
            };
        }
    };





    const handleDeleteProduct = async (productId) => {
        try {
            const data = await deleteProduct(productId);
            dispatch(removeSellerProduct(productId));
        } catch (err) {
            return {
                status: false,
                message: err.response.data.message || "Something went wrong",
            }
        }
    };





    const handleAddProductVariant = async (productId, formData) => {
        try {
            const data = await addProductVariant(productId, formData);
        } catch (err) {
            return {
                status: false,
                message: err.response.data.message || "Something went wrong",
            }
        }
    };






    return {
        handleGetSellerSubOrders,
        handleCreateProduct,
        handleGetAllProductsBySeller,
        handleDeleteProduct,
        handleAddProductVariant,
    };
};
