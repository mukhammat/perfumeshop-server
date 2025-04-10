import { Category, PrismaClient } from "@prisma/client";

export interface ICategoryService {
    create(name: string): Promise<unknown>;
    delete(id: number): Promise<void>;
    update(id: number, name: string): Promise<void>;
    getAll(): Promise<Category[]>;
}

export class CategoryService {
    constructor(private prisma: PrismaClient) {}

    async create(name: string) {
        console.log("CategoryService")
        const checkCategory = await this.prisma.category.findUnique({
            where: {
                name,
            },
        });
    
        if (checkCategory?.name === name) {
            throw new Error("Ctegory name must be unique!")
        }
    
        return await this.prisma.category.create({
            data: {
                name,
            },
        });
    }

    async delete(id: number) {
        await this.prisma.category.delete({
            where: {
                id,
            },
        });
    }

    async update(id: number, name: string) {
        await this.prisma.category.update({
            data: {
                name,
            },
            where: {
                id,
            },
        });
    }

    async getAll() {
        return this.prisma.category.findMany(); 
    }
}