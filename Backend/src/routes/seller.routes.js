import {Router} from 'express'
import {authenticateSeller} from '../middlewares/auth.middleware.js'
import multer from "multer";

import {
    getSellerSubOrders,
    createProduct,
    getAllProductsBySeller,
    deleteProduct,
    createVariants
} 
    from '../controllers/seller.controllers.js'

import {validateProduct , validateProductId ,parseSizes ,  VariantValidation} from '../validation/product.validator.js'




const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("Only JPG, PNG, WEBP files allowed"), false)
  }
}


const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize : 3 * 1024 * 1024   // per file limit
    },
    fileFilter
})


const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    })
  }

  next()
}




const router = Router()



/**
 * @route POST /api/seller/create-product
 * @description Create a new product by seller only 
 * @access private (seller only)
 */

router.post('/create-product' , 
    authenticateSeller,
    upload.array('images' , 5), 
    multerErrorHandler,              // handle size/count/type errors
    parseSizes ,
    validateProduct ,   
    createProduct 
  )




/**
 * @route GET /api/seller/orders
 * @description Get all subOrders placed by users for this seller
 * @access private (seller only)
 */

router.get('/orders' , authenticateSeller , getSellerSubOrders )


  

  /**
   * @route GET /api/seller/products
   * @description Get all products created by seller
   * @access private (seller only)
   */


router.get('/products' , authenticateSeller , getAllProductsBySeller)    



/** 
 * @route DELETE /api/seller/products/:id
 * @description Delete a product by seller
 * @access Private
*/

router.delete('/products/:id',  authenticateSeller , validateProductId , deleteProduct)




/**
 * @route POST /api/seller/products/:id/variants
 * @description Create variants of a product
 * @access Private
 */

router.post('/products/:id/variants', 
   authenticateSeller ,
   upload.array('images' , 5) , 
   multerErrorHandler, 
   parseSizes ,
   VariantValidation ,
   createVariants)







export default router