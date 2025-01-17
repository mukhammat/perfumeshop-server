import prisma from "../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async";

export const search = asyncWrapper(async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
        return res.status(400).json({
            message: "Query parameter 'q' is required and must be a string",
        });
    }

    const perfumes = await prisma.perfume.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                {
                    analogs: {
                        some: {
                            name: {
                                contains: query,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ],
        },
        include: {
            analogs: true, // Включаем аналоги в результат
        },
    });

    res.json(perfumes);
});
