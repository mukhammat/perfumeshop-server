import { NextFunction, Request, Response, Router } from "express";
import { UserService } from ".";
import { authorize } from "@middleware";

export interface IUserController {
    router: Router;
}

export class UserController implements IUserController {
    public readonly router;
    constructor(private userService: UserService) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get("/me", authorize, this.getInfo.bind(this))
    }

    private async getInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.body.user.id;
            const userinfo = await this.userService.getInfo(id);
            res.status(200).json({userinfo});
        } catch (error: any) {
            next(error);
        }
    }
}