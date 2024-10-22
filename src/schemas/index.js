import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const AddOperatorSchema = z.object({
  fname: z.string({
    message: "First Name is required",
  }),
  lname: z.string({
    message: "Last Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone Number is required",
  }),
});

export const EditOperatorSchema = z.object({
  fname: z.string({
    message: "First Name is required",
  }),
  lname: z.string({
    message: "Last Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone Number is required",
  }),
  status: z.boolean().optional(),
});
