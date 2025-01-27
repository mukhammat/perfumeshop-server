import asyncWrapper from "../../middleware/async.middleware";
import { Request, Response } from "express";
import prisma from "../../databases/prisma";

export const getMe = asyncWrapper(async (req: Request, res:Response) => {
    // const admin = req.admin;
    // if(!admin && typeof admin !== "object") {
    //     return res.status(403).json({ message: "Access denied" });
    // }
    // console.log(admin.id);
    res.status(200).json({ message: "Success" });
});