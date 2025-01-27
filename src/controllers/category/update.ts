import prisma from "../../config/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async.middleware";

export const update = asyncWrapper(async (req: Request, res: Response) => {
    const { id, name } = req.body;
    await prisma.category.update({
        data: {
            name,
        },
        where: {
            id,
        },
    });

    res.status(200).json({ message: "Content is updated!" });
});
