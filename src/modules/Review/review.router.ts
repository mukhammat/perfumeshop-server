import { Router } from "express";
import { IReviewController, createSchema } from ".";
import { validate, authorize } from "../../common/middleware"

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