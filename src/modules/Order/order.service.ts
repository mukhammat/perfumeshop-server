import { PrismaClient, Order } from "@prisma/client";
import { OrderDTO } from ".";

export interface IOrderService {
    create(rest: OrderDTO): Promise<Order>;
}

export class OrderService implements IOrderService {
    constructor(private prisma: PrismaClient) {}

    async create(rest: OrderDTO) {
        const { user_id, ...data } = rest;

        console.log("Create order service");
        return this.prisma.order.create({
            data: {
                ...data,
                user: { connect: { id: user_id } },
            },
        });
    }
}