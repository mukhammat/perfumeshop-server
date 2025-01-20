import prisma from "../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async";

export const create = asyncWrapper(async (req: Request, res: Response) => {
    const { name, perfume_code, price, description, category_id, image_path, analog } =
        req.body;

    const perfume = await prisma.perfume.findUnique({
        where: {
            perfume_code,
        },
    });

    if (perfume?.perfume_code === perfume_code) {
        return res.status(400).json({
            message: "Perfume code should be unique!",
        });
    }

    await prisma.perfume.create({
        data: {
            name,
            perfume_code,
            description,
            price,
            category_id,
            image_path,
            analog
        },
    });
    res.status(201).json({ message: "Perfume created" });
});
