import { Request, Response, Router } from "express";
import { IAuthService } from ".";
import { asyncWrapper } from "@middleware"

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
        this.router

        .post("/login", this.login)
        .post("/register", this.register);
    }

    private login = asyncWrapper(async (req: Request, res: Response) => {

        const {email, password} = req.body;


        const jwt = await this.authService.login(email, password);


        res.status(200).json({status: "Success", token: jwt});

    });



    private register = asyncWrapper(async (req: Request, res: Response) => {

        const {name, email, password} = req.body;

        const jwt = await this.authService.register(name, email, password);

        res.status(201).json({status: "Success", token: jwt});

    });
}