import Router from 'express'
import {authenticateUser} from '../middlewares/auth.middleware.js'
import { addItemToCart , removeItemFromCart , getCartItems , incrementCartItemQuantity , decrementCartItemQuantity , createOrderController , verifyOrderController } from '../controllers/cart.controllers.js'
import { validateAddToCart , validateItemId } from '../validation/cart.validation.js'

const router = Router()

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @description Add a product to cart
 * @param  productId - Product ID of the product to be added
 * @param  variantId - Variant ID of the variant of product to be added
 * @body quantity - Quantity of the product to be added (optional, default is 1)
 * @access Private
 */


router.post('/add/:productId/:variantId' , authenticateUser , validateAddToCart, addItemToCart )



/**
 * @route DELETE /api/cart/remove/:itemId
 * @description Remove an item from cart
 * @param  itemId - Item ID of the item to be removed
 * @access Private
 */

router.patch('/remove/:itemId' , authenticateUser , validateItemId , removeItemFromCart )



/**
 * @route GET /api/cart
 * @description Get all cart items
 * @access Private
 */

router.get('/' , authenticateUser , getCartItems )


/**
 * @route PATCH /api/cart/quantity/increment/:itemId
 * @description Increment quantity of an item in cart
 * @param  itemId - Item ID of the item to be incremented
 * @access Private
 */
router.patch('/quantity/increment/:itemId' , authenticateUser , validateItemId , incrementCartItemQuantity )


/**
 * @route PATCH /api/cart/quantity/decrement/:itemId
 * @description Decrement quantity of an item in cart
 * @param  itemId - Item ID of the item to be decremented
 * @access Private
 */
 
router.patch('/quantity/decrement/:itemId' , authenticateUser , validateItemId , decrementCartItemQuantity )




/**
 * @route POST /api/cart/payment/create/order
 * @description Make a payment
 * @access Private
 */


router.post('/payment/create/order' , authenticateUser , createOrderController )


/**
 * @route POST /api/cart/payment/verify/order
 * @description Verify a payment
 * @access Private
 * @body order_id , payment_id , signature , addressId
 */

router.post('/payment/verify/order' , authenticateUser , verifyOrderController )





export default router


