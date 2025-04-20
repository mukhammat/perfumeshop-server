import { PrismaClient } from "@prisma/client";

export interface IOrderService {

}

export class OrderService implements IOrderService {
    constructor(private prisma: PrismaClient) {}

    create(data: any) {
        console.log("Create order service");
        return this.prisma.order.create({
            data
        });
    }
}