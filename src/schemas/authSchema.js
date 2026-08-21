import { z } from "zod";

// login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  pass: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

// register schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    pass: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must contain at least 6 characters."),
    ConfirmPass: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.pass === data.ConfirmPass, {
    message: "Passwords do not match",
    path: ["ConfirmPass"],
  });
