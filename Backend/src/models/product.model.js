import mongoose from "mongoose";
import priceSchema from "./price.model.js";
import {CATEGORIES} from "../constants/categories.js"

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  category: {
    type: String,
    enum: CATEGORIES,
    required: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },


  price: {
    type: priceSchema,
    required: true
  },


  //  color-wise images for variants
  imagesByColor: {
    type: Map,
    of: [
      {
        url: {
          type: String,
          required: true,
          trim: true
        },
        _id: false
      }
    ],
    default: {}
  },

  // flattened variants
  variants: [
    {
      color: {
        type: String,
        required: [true, 'color of varient is required']
      },

      size: {
        type: String,
        required: [true, 'size of varient is required']
      },

      stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
      },

      price: {
        type: priceSchema
      }
    }
  ]

}, {
  timestamps: true
});



productSchema.index(
  { _id: 1, "variants.color": 1, "variants.size": 1 },
  { unique: true }
);

const productModel = mongoose.model("product", productSchema);
export default productModel;