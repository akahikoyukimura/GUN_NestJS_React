import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  pass: z
    .string()
    .min(1, "Password is required")
    .min(6,"Password must contain at least 6 characters."),

  rememberMe: z.boolean(),
});