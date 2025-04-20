import { NextFunction, Request, Response, Router } from "express";
import { IAuthService } from ".";

export interface IAuthController {
    router: Router;
}

export class AuthController implements IAuthController {
    public readonly router: Router;
    constructor(private authService: IAuthService) {
        this.router = Router();
        this.routes()
    }

    private routes() {
        this.router.route("/login").post(this.login.bind(this));
        this.router.route("/register").post(this.register.bind(this));
    }

    private async login (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const jwt = await this.authService.login(email, password);
            res.status(200).json({status: "Success", token: jwt});
        } catch (error: any) {
            next(error);
        }
    }

    private async register (req: Request, res: Response, next: NextFunction) {
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