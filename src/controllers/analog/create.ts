import prisma from "../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async";

export const create = asyncWrapper(async (req: Request, res: Response) => {
    const { name } = req.body;
    const analog = await prisma.analog.create({
        data: {
        name,
        },
    });

    res.status(201).json({message: `success ${analog}`});
});