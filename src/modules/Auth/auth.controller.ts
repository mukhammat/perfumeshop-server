import { NextFunction, Request, Response } from "express";
import { IAuthService } from "./auth.service";

export interface IAuthController {
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuthController implements IAuthController {
    constructor(private authService: IAuthService) {
    }

    async login (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const jwt = await this.authService.login(email, password);
            res.status(200).json({status: "Success", token: jwt});
        } catch (error: any) {
            next(error);
        }
    }

    async register (req: Request, res: Response, next: NextFunction) {
        try {
            console.warn("Register")
            const {name, email, password} = req.body;
            const jwt = await this.authService.register(name, email, password);
            res.status(201).json({status: "Success", token: jwt})
        } catch (error: any) {
            next(error);
        }
    };
}