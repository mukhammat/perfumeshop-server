import prisma from "../../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../../middleware/async";
import { hashPassword } from '../../../helpers/hash.helper';
import { jwtGenerate } from '../../../helpers/jwt.helper';

export const register = asyncWrapper(async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    const hash = await hashPassword(password);

    const admin = await prisma.admin.create({
        data: {
            name,
            email,
            password: hash,
        }
    });

    const jwt = jwtGenerate({id: admin.id,name: admin.name, email: admin.email});

    res.status(201).json({token: jwt});
})