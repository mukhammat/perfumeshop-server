import { z } from "zod";

export const orderSchema = z.object({
  address: z.string().min(1, "Address is required"),
  country: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  delivery_price: z.number().nonnegative("Delivery price must be a positive number"),
  order_price: z.number().nonnegative("Order price must be a positive number"),
  tracking_number: z.string().optional(),
  delivery_method: z.string().optional(),
  expected_delivery: z.coerce.date().optional(),
  notes: z.string().optional(),
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]).optional(), // подставь свои значения
}).strict();