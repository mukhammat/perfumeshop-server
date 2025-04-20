import { NextFunction, Request, Response, Router } from "express";
import { IOrderService } from ".";
import { validate, authorize } from "../../common/middleware"

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
    }
}