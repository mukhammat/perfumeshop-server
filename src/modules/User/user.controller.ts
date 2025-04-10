import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

export interface IUserController {
    getInfo(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class UserController {
    constructor(private userService: UserService) {}

    async getInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.body.user.id;
            const userinfo = await this.userService.getInfo(id);
            res.status(200).json({userinfo});
        } catch (error: any) {
            next(error);
        }
    }
}