import { Router } from "express";
import { IUserController } from "./user.controller";
import { authorize } from "../../common/middleware/authorize.middleware";

export class UserRouter {
    private readonly router;
    constructor(private userController: IUserController){
        this.router = Router();
    }

    init() {
        this.router.get("/me", authorize, this.userController.getInfo.bind(this.userController))
        return this.router;
    }
}