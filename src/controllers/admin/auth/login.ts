import prisma from "../../../databases/prisma";
import { Request, Response } from "express";
import asyncWrapper from "../../../middleware/async";
import { comparePassword } from '../../../helpers/hash.helper';
import { jwtGenerate } from '../../../helpers/jwt.helper';


export const login = asyncWrapper(async (req: Request, res: Response) => {
    const {login, password} = req.body;

    const user = await prisma.admin.findFirst(login);

    if(!user) {
        return res.status(404).json({ message: "User is undefined" });
    }

    const isValidPass = await comparePassword(password, user.password);

    if(!isValidPass) {
        return res.status(404).json({ message: "Login or password is not correct!" });
    }
    
    const jwt = jwtGenerate({id: user.id,name: user.name, email: user.email});


    res.status(200).json({token: jwt});
});