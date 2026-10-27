import { z } from "zod";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-`~[\]{}|;:',./<>?]).{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;