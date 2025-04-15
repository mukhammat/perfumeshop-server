import { Router } from "express";
import { IReviewController } from "./review.controller";
import { validate } from "../../common/middleware/validate.middleware"
import { authorize } from "../../common/middleware/authorize.middleware"
import { createSchema } from "./review.schema"

export class ReviewRouter {
  private readonly router;
  constructor(private reviewController: IReviewController) {
    this.router = Router();
  }

  init() {
    this.router.post("/create", authorize,  validate(createSchema), this.reviewController.create.bind(this.reviewController));

    return this.router;
  }
}