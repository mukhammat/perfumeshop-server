import { z } from 'zod';

export const searchSchema = z.object({
  q: z.string().min(1, "Поисковый запрос обязателен"),
  priceFrom: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Number(val)), {
      message: "priceFrom должен быть числом",
    }),
  priceTo: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Number(val)), {
      message: "priceTo должен быть числом",
    }),
  analog: z
    .string()
    .optional(),
  sort: z
    .string()
    .optional()
    .refine(val => !val || ['price', 'alphabet'].includes(val), {
      message: "sort должен быть 'price' или 'alphabet'",
    }),
});


export type SearchSchemaType = z.infer<typeof searchSchema>;