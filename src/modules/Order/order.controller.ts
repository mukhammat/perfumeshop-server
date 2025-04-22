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
        this.router.put("/update/:order_id", authorize, this.update.bind(this))
        this.router.get("/get/:order_id", authorize, this.getOne.bind(this))
        this.router.get("/getMany", authorize, this.getMany.bind(this))
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

    private async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { order_id } = req.params;
            const user_id = res.locals.user.id;
            const order = await this.orderService.update({user_id, order_id, ...req.body});
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    private async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { order_id } = req.params;
            const user_id = res.locals.user.id;
            const order = await this.orderService.getOneByOrderId(user_id, Number(order_id));
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    private async getMany(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = res.locals.user.id;
            const orders = await this.orderService.getManyByUserId(user_id);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
}