import prisma from "../databases/prismaClient";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
    const perfumes = await prisma.perfume.findMany();
    res.json(perfumes);
};

export const getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const perfume = await prisma.perfume.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(perfume);
};

export const create = async (req: Request, res: Response) => {
    const { name, brand, price, description } = req.body;
    const perfume = await prisma.perfume.create({
        data: {
            name,
            perfume_id: "qwe123",
            description,
            price,
            brand_id: 1,
            category_id: 5,
        },
    });
    res.json(perfume);
};
