import { Router } from "express";
import { IPerfumeController, searchSchema } from ".";
import { validate } from "../../common/middleware";

export class PerfumeRouter {
  private readonly router;
  constructor(private perfumeController: IPerfumeController) {
    this.router = Router();
  }

  init() {
    this.router.route("/create").post(this.perfumeController.create.bind(this.perfumeController));
    this.router.route("/get-all").get(this.perfumeController.getAll.bind(this.perfumeController));
    this.router.route("/get-one/:id").get(this.perfumeController.getOne.bind(this.perfumeController));
    this.router.get(
      "/search",
      validate(searchSchema, "query"),
      this.perfumeController.search.bind(this.perfumeController));
    this.router.route("/get-by-category/:category_id").get(this.perfumeController.getByCategory.bind(this.perfumeController));
    return this.router;
  }
}