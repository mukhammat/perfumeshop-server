import { z } from 'zod';

export const perfumeSearchSchema = z.object({
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
  volume: z
    .number()
    .optional()
    .refine(val => !val || [30, 50].includes(val), {
      message: "Объем должен быть 30 или 50 мл",
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
