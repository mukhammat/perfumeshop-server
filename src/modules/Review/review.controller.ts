import { NextFunction, Request, Response } from "express";
import { IReviewService } from ".";

export interface IReviewController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class ReviewController implements IReviewController {
    constructor(private reviewService: IReviewService) {
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { perfumeId, rating, text } = req.body;
            const userId = res.locals.user.id;
            const review = await this.reviewService.create({ perfumeId, userId, rating, text });
            res.status(201).json(review);
        } catch (error) {
            next(error);
        }
    }
}