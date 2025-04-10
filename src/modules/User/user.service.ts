import { PrismaClient } from "@prisma/client";

type UserInfo = {
    id: number;
    email: string;
    name: string;
    isAdmin: boolean;
}

export interface IUserService {
    getInfo(user_id: number):Promise<UserInfo>
}

export class UserService implements IUserService {
    constructor(private prisma: PrismaClient) {}
    async getInfo(user_id: number) {
        const user = await this.prisma.user.findUnique({
            where:{
                id: user_id
            }
        });

        if(!user) {
            throw new Error("Данные не найдены")
        }
        return {id: user.id, email: user.email, name: user.name, isAdmin: user.is_admin };
    }
}