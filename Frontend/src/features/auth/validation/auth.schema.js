import {z} from "zod";



export const registerSchema = z.object({
  fullname: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters long"),

  email: z
    .string()
    .email("Invalid email format"),

  contact: z
    .string()
    .min(1, "Contact is required")
    .regex(/^\d{10}$/, "Contact must be a 10-digit number"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be between 6 and 10 characters")
    .max(10, "Password must be between 6 and 10 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  isSeller: z.boolean().optional(),
});



export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required"),
});

