import { PrismaClient, Prisma, Review } from "@prisma/client";
import { NotFoundException } from "../../common/exceptions"

export interface IReviewService {
    create(data: Prisma.ReviewUncheckedCreateInput): Promise<Review>;
    delete(id: number): Promise<Review>;
    getManyByPerfumeId(perfumeId: number): Promise<Review[]>;
}

export class ReviewService implements IReviewService {
    constructor(private prisma: PrismaClient) {}

    private async hasPerfume(id: number) {
        console.log("Check if perfume exists service");
        const perfume = await this.prisma.perfume.findUnique({ where: { id } });
        if (!perfume) {
            throw new NotFoundException(`Perfume with id ${id} not found`);
        }
        return true;
    }

    async create(data: Prisma.ReviewUncheckedCreateInput) {
        const perfumeId = data.perfumeId;
        
        console.log("Check if perfume exists service");
        await this.hasPerfume(perfumeId);

        console.log("Create review service");
        return this.prisma.review.create({
            data
        });
    }

    async delete(id: number) {
        console.log("Delete review service");
        return this.prisma.review.delete({ where: { id } });
    }

    async getManyByPerfumeId(perfumeId: number) {
        console.log("Get reviews by perfume id service");
        return this.prisma.review.findMany({ 
            where: { perfumeId },
            orderBy: { createdAt: "desc" }, 
        });
    }
}