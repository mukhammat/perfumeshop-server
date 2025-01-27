import prisma from "../../config/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../middleware/async.middleware";
import { comparePassword } from '../../utils/hash';
import { jwtGenerate } from '../../utils/jwt';


export const login = asyncWrapper(async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const admin = await prisma.user.findUnique({
        where: {
          email
        }
    });

    const notFoundMessage = "Login or password is not correct!";

    if(!admin) {
        return res.status(404).json({ message: notFoundMessage });
    }

    const isValidPass = await comparePassword(password, admin.password);

    if(!isValidPass) {
        return res.status(404).json({ message: notFoundMessage });
    }
    
    const jwt = jwtGenerate({id: admin.id,name: admin.name, email: admin.email});

    res.status(200).json({token: jwt});
});