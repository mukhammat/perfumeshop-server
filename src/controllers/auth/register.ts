import prisma from "../../config/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async.middleware";
import { hashPassword } from '../../utils/hash';
import { jwtGenerate } from '../../utils/jwt';

export const register = asyncWrapper(async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    const hash = await hashPassword(password);

    const admin = await prisma.user.create({
        data: {
            name,
            email,
            password: hash,
        }
    });

    const jwt = jwtGenerate({id: admin.id,name: admin.name, email: admin.email});

    res.status(201).json({token: jwt});
})