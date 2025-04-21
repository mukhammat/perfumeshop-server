import { NextFunction, Request, Response, Router } from "express";
import { IOrderService, orderSchema } from ".";
import { validate, authorize } from "@middleware"

export interface IOrderController {
    router: Router;
}

export class OrderController implements IOrderController {
    public readonly router: Router;
    constructor(private orderService: IOrderService) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post("/create", authorize, validate(orderSchema, "body"), this.create.bind(this))
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = res.locals.user.id;
            const order = await this.orderService.create({user_id, ...req.body});
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }
}