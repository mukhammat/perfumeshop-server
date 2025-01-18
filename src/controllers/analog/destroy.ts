import prisma from "../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async";

export const destroy = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.analog.delete({
        where: {
            id: parseInt(id),
        },
    });

    res.json({
        message: "Category deleted",
    });
}); 
