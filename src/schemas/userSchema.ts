import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, { message: "The name must be at least 3 characters long." }),
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

export const loginSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

export const userUpdateSchema = z.object({
    name: z.string().min(3, { message: "The name must be at least 3 characters long." }).optional(),
    email: z.email({ message: "Invalid email" }).optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }).optional(),
});


