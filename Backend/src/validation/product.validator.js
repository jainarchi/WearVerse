import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { CATEGORIES } from "../constants/categories.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next()
}




export const validateProductId = [

  param('id').isMongoId().withMessage("Invalid product ID format"),
  validateRequest
];




// optional parser (only if FormData)
export const parseSizes = (req, res, next) => {
  if (req.body.sizes && typeof req.body.sizes === "string") {
    try {
      req.body.sizes = JSON.parse(req.body.sizes);
    } catch (err) {
      return res.status(400).json({ message: "Invalid sizes format" });
    }
  }
  next();
};



const colorAndSizesValidation = [
 //color
   body("color")
    .trim()
    .notEmpty().withMessage("Color is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Color must be 3–20 characters"),

    //sizes 
   body("sizes")
    .isArray({ min: 1 })
    .withMessage("At least one size is required"),

  body("sizes.*.size")
    .trim()
    .notEmpty()
    .withMessage("Size is required")
    .isLength({ max:5 })
    .withMessage("Size too long"),

  body("sizes.*.stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be >= 0"),

  //  total stock consistency check

  body("sizes").custom((sizes, { req }) => {
    if (req.body.stock) {
      const total = sizes.reduce((sum, s) => sum + Number(s.stock || 0), 0);
      if (total !== Number(req.body.stock)) {
        throw new Error("Total size stock must match overall stock");
      }
    }
    return true;
  })
]




export const validateProduct = [

    
  body("title")
    .trim()
    .notEmpty().withMessage("Product title is required")
    .isLength({ min: 3 }).withMessage("Product title must be at least 3 characters long"),

  body("description")
    .trim()
    .notEmpty().withMessage("Product description is required")
    .isLength({ min: 10 }).withMessage("Product description must be at least 10 characters long"),

    body("category")
      .trim()
      .notEmpty().withMessage("Product category is required")
      .isIn(CATEGORIES).withMessage("Invalid product category"),

  body("priceAmount")
    .notEmpty().withMessage("Product price is required")
    .isNumeric().withMessage("Product price must be a number")
    .isInt({ min: 0 })
    .withMessage("Price must be a valid positive number"),


  body("priceCurrency")
    .notEmpty().withMessage("Product currency is required")
    .isLength({ min: 3 }).withMessage("Product currency must be 3 characters long"),

 
    ...colorAndSizesValidation ,


  validateRequest
]




export const VariantValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid product ID"),
 

  // price
  body("priceAmount")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Price must be a valid positive number"),



    ...colorAndSizesValidation , 

  validateRequest
];
