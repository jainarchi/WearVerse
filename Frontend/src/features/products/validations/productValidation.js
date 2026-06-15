import { z } from "zod";
import { CATEGORIES } from "../constants/categories.js";

export const variantSchema = z.object({

    color: z
        .string()
        .trim()
        .min(1, "Color is required")
        .min(3, "Color must be at least 3 characters"),

    priceAmount: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(val), {
            message: "Price must be a number"
        }),

    sizes: z
        .array(
            z.object({
                size: z
                    .string()
                    .trim()
                    .min(1, "Size is required"),

                stock: z
                    .string()
                    .min(1, "Stock is required")
                    .refine(val => !isNaN(val) && Number(val) >= 0, {
                        message: "Stock must be >= 0"
                    })
            })
        )
        .min(1, "At least one size is required")
        .refine((sizes) => {
            const seen = new Set();
            for (let s of sizes) {
                if (seen.has(s.size)) return false;
                seen.add(s.size);
            }
            return true;
        }, {
            message: "Duplicate sizes not allowed"
        }),


    images: z
        .array(
            z.object({
                file: z
                    .instanceof(File)
                    .refine(
                        (file) =>
                            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
                        "Only JPG, PNG, WEBP files allowed"
                    )
                    .refine(
                        (file) => file.size <= 3 * 1024 * 1024,
                        "Max file size is 3MB"
                    )
            })
        )
        .min(1, "At least one image is required")
});



export const createProductSchema = z.object({

    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters"),

    description: z
        .string()
        .trim()
        .min(1, "Description is required")
        .min(3, "Description must be at least 10 characters"),

    priceAmount: z
        .string()
        .trim()
        .min(1, "Price is required")
        .refine(val => !isNaN(val), {
            message: "Price must be a number"
        }),


    priceCurrency: z
        .string()
        .trim()
        .min(1, "Currency is required")
        .min(3, "Currency must be at least 3 characters"),

    color: z
        .string()
        .trim()
        .min(1, "Color is required")
        .min(3, "Color must be at least 3 characters"),

  category: z
  .string()
  .trim()
  .min(1, "Category is required")
  .refine(
    (value) => CATEGORIES.includes(value),
    {
      message: "Invalid category",
    }
  ),

  
    sizes: z
        .array(
            z.object({
                size: z
                    .string()
                    .trim()
                    .min(1, "Size is required"),

                stock: z
                    .string()
                    .min(1, "Stock is required")
                    .refine(val => !isNaN(val) && Number(val) >= 0, {
                        message: "Stock must be >= 0"
                    })
            })
        )
        .min(1, "At least one size is required")
        .refine((sizes) => {
            const seen = new Set();
            for (let s of sizes) {
                if (seen.has(s.size)) return false;
                seen.add(s.size);
            }
            return true;
        }, {
            message: "Duplicate sizes not allowed"
        }),

    images: z
        .array(
            z.object({
                file: z
                    .instanceof(File)
                    .refine(
                        (file) =>
                            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
                        "Only JPG, PNG, WEBP files allowed"
                    )
                    .refine(
                        (file) => file.size <= 3 * 1024 * 1024,
                        "Max file size is 3MB"
                    )
            })
        )
        .min(1, "At least one image is required")
})