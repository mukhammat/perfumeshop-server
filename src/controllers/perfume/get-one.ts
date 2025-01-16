import prisma from "../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async";

export const getOne = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const perfume = await prisma.perfume.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(perfume);
});
