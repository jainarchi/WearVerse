import mongoose from "mongoose";
import priceSchema from "./price.model.js";

const subOrderSchema = new mongoose.Schema({

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        order : {
            // delivery address
            type : mongoose.Schema.Types.ObjectId,
            ref : 'order',
            required : true
        },
        
        items: [ // seller ordered proudct  
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    required: true
                },
                variantId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                image: {
                    url: {
                        type: String,
                        required: true
                    }
                },
                price: { 
                    type: priceSchema, 
                    required: true 
                },
                title :{
                    type : String,
                    required : true
                },
                size:{
                    type : String,
                    required : true
                },
                color :{
                    type : String,
                    required : true
                }
            }
        ],


        // total price of seller's product in cart
        totalPrice : {
            type : priceSchema,
            required : true
        },

        status: {
            type: String,
            enum: ['confirmed', 'processing', 'shipped', 'delivered'],

            default: 'confirmed'
        }

    }, { timestamps: true })



const subOrderModel = mongoose.model('suborder', subOrderSchema)

export default subOrderModel