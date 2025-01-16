import prisma from "../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async";

export const create = asyncWrapper(async (req: Request, res: Response) => {
    const { name } = req.body;

    const checkCategory = await prisma.category.findUnique({
        where: {
            name,
        },
    });

    if (checkCategory?.name === name) {
        return res.status(400).json({
            message: "Ctegory name should be unique!",
        });
    }

    const category = await prisma.category.create({
        data: {
            name,
        },
    });

    res.status(201).json({
        message: "Category created",
        categoryId: category.id,
    });
});
