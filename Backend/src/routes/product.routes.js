import { Router } from "express";
import {authenticateSeller} from '../middlewares/auth.middleware.js'
import {  getProductDetails , getAllProducts } from "../controllers/product.controllers.js";
import { validateProductId } from "../validation/product.validator.js";


const router = Router()


/**
 * @route GET /api/products
 * @description Get all products
 * @access Public
 */
router.get('/' , getAllProducts)



/**
 * @route GET /api/products/:id/details
 * @description get product details
 * @access Public
 */


router.get('/:id/details' , validateProductId  , getProductDetails)



export default router