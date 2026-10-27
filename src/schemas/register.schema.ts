import { z } from "zod";

const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-`~[\]{}|;:',./<>?]).{8,}$/;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters"),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters"),

   email: z
      .string()
      .min(1, "Email is required")
      .regex(emailRegex, "Please enter a valid email"),

    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required"),

    gender: z.enum(["male", "female"], {
      message: "Please select your gender",
    }),

    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        passwordRegex,
        "Password must contain at least 8 characters, uppercase, lowercase, number and special character"
      ),

    rePassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type     RegisterFormData = z.infer<typeof registerSchema>;