import { Image, Prisma, PrismaClient } from "@prisma/client";

export interface IImageService {
    create(data: Prisma.ImageCreateManyInput):Promise<unknown>
    delete(id: number): Promise<void>;
    update(id: number, image_path: string):Promise<void>
}

export class ImageService implements IImageService {
    constructor(private prisma: PrismaClient) {}

    async create(data: Prisma.ImageCreateManyInput) {
        return this.prisma.image.create({
            data
        });
    }

    async delete(id: number) {
        await this.prisma.image.delete({
            where: {
                id
            }
        });
    }

    async update(id: number, image_path: string) {
        const a = await this.prisma.image.update({
            where: {
                id
            },
            data: {
                image_path
            }
        });
        console.log(a);
    }

    private async findById(id: number): Promise<Image | null> {
        return this.prisma.image.findUnique({
            where: {
                id
            }
        })
    }
}