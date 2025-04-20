import { NextFunction, Request, Response, Router } from "express";
import { IReviewService, createSchema } from ".";
import { validate, authorize } from "../../common/middleware"

export interface IReviewController {
    router: Router;
}

export class ReviewController implements IReviewController {
    public readonly router: Router;
    constructor(private reviewService: IReviewService) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post("/create", authorize,  validate(createSchema), this.create.bind(this));
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { perfumeId, rating, text } = req.body;
            const userId = res.locals.user.id;
            const review = await this.reviewService.create({ perfumeId, userId, rating, text });
            res.status(201).json(review);
        } catch (error) {
            next(error);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { reviewId } = req.query;
            const userId = res.locals.user.id;
            //const review = await this.reviewService.delete();
            //res.status(201).json(review);
        } catch (error) {
            next(error);
        }
    }
}