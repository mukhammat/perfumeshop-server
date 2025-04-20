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
        this.router.delete('/:reviewId', authorize, this.delete.bind(this));
        this.router.get("/:perfumeId", this.getAll.bind(this));
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
            const { reviewId } = req.params;
            if(!reviewId) {
                res.status(400).json({ message: 'Review id is required' });
                return;
            }
            const userId = res.locals.user.id;
            await this.reviewService.delete(Number(reviewId), userId);
            res.status(201).json({ message: 'Review deleted successfully'});
        } catch (error) {
            next(error);
        }
    }

    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { perfumeId } = req.params;
            if(!perfumeId) {
                res.status(400).json({ message: 'Perfume id is required' });
                return;
            }
            const reviews = await this.reviewService.getManyByPerfumeId(Number(perfumeId));
            res.status(200).json(reviews);
        } catch (error) {
            next(error);
        }
    }
}