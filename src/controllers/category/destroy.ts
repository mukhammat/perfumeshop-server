import prisma from "../../config/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async.middleware";

export const destroy = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.category.delete({
        where: {
            id: parseInt(id),
        },
    });

    res.json({
        message: "Category deleted",
    });
});
