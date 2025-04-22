import { PrismaClient, Order, Prisma } from "@prisma/client";
import { OrderDTO, UpdateOrderDTO } from ".";
import { NotFoundException } from "@exceptions";

export interface IOrderService {
    create(rest: OrderDTO): Promise<Order>;
    update(rest: UpdateOrderDTO): Promise<Order>;
    getManyByUserId(userId: number): Promise<Order[]>;
    getOneByOrderId(orderId: number, userId: number): Promise<Order>;
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

    async update(rest: UpdateOrderDTO) {
        const { user_id, order_id,...data } = rest;

        return this.prisma.order.update({
            where: {
              id_user_id: {
                id: order_id,
                user_id: user_id,
              },
            },
            data,
        });
    }

    async getManyByUserId(userId: number) {
        return this.prisma.order.findMany({
            where: {
                user_id: userId,
            },
            include: {
                items: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });
    }

    async getOneByOrderId(orderId: number, userId: number) {
        const order = await this.prisma.order.findUnique({
            where:{
                id_user_id: {
                    id: orderId,
                    user_id: userId,
                },
            },
            include: {
                items: true
            }
        });

        if(!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }
}