import prisma from "../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async";

export const getAll = asyncWrapper(async (req: Request, res: Response) => {
    const perfumes = await prisma.perfume.findMany();
    res.json(perfumes);
});
