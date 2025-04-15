import { z } from 'zod';

export const createSchema = z.object({
    perfumeId: z
        .number()
        .min(1, "ID парфюма обязателен"),
    text: z.string().min(1, "Отзыв обязателен"),
    rating: z
        .number()
        .min(1, "Рейтинг должен быть от 1 до 5")
        .max(5, "Рейтинг должен быть от 1 до 5"),
}).strict();

export type ReviewSchemaType = z.infer<typeof createSchema>;