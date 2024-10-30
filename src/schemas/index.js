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
  name: z.string({
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone Number is required",
  }),
});

export const EditOperatorSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone Number is required",
  }),
  status: z.boolean().optional(),
});

export const AddMachineSchema = z.object({
  machineName: z.string({
    message: "Machine name is required",
  }),
  description: z.string({
    message: "Description is required",
  }),
  location: z.string({
    message: "Location is required",
  }),
});

export const EditMachineSchema = z.object({
  machineName: z.string({
    message: "Machine name is required",
  }),
  description: z.string({
    message: "Description is required",
  }),
  location: z.string({
    message: "Location is required",
  }),
  status: z.boolean().optional(),
});

export const AddProductSchema = z.object({
  productName: z.string({
    message: "Product Name is required",
  }),
  price: z
    .string({
      required_error: "Price is required",
    })
    .regex(/^\d+(\.\d+)?$/, {
      message: "Price must be a valid floating-point number",
    }),
  slotNumber: z
    .number({ invalid_type_error: "Slot number must be a integer value" })
    .positive("Slot number must be greater than 0")
    .int("Slot number must be an integer"),
});

export const assignProductSchema = z.object({
  selectedProductId: z.string().nonempty("Please select a product"),
  creditAmount: z
    .number({ invalid_type_error: "Credit amount must be a number" })
    .positive("Credit amount must be greater than 0")
    .int("Credit amount must be an integer"),
});
