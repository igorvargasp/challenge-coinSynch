import { z } from "zod";

// Must have all fields declared and registered, if not
export const signUpSchema = z
    .object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(1),
        readTerms: z.boolean(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        console.log({
            confirmPassword,
            password,
        });
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });