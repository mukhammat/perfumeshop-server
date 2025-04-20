import { PrismaClient, Prisma, Review } from "@prisma/client";
import { NotFoundException } from "../../common/exceptions"
import { BadRequestError } from "routing-controllers";

export interface IReviewService {
    create(data: Prisma.ReviewUncheckedCreateInput): Promise<Review>;
    delete(reviewId: number, userId: number): Promise<Review>;
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

    async delete(reviewId: number, userId: number) {
        console.log("Delete review service");

        console.log("Check if review exists service");
        console.log("reviewId:", reviewId);
        const hasReview = await this.prisma.review.findUnique({ 
            where: {
                id: reviewId
            }, select: {
            id: true,
            perfumeId: true,
            userId: true,
        } });

        if (!hasReview) {
            throw new NotFoundException(`Review with id ${reviewId} not found`);
        }

        if(userId !== hasReview?.userId) {
            throw new NotFoundException(`Review with id ${reviewId} not found`);
        }
        
        return this.prisma.review.delete({
            where: { id: hasReview.id },
        });
    }

    async getManyByPerfumeId(perfumeId: number) {
        await this.hasPerfume(perfumeId);
        console.log(`Get reviews by perfume id ${perfumeId}  service`);
        return this.prisma.review.findMany({ 
            where: { perfumeId },
            orderBy: { createdAt: "desc" }, 
        });
    }
}