import { Router } from "express";
import { ICategoryController } from "./category.controller";
import { authorize } from "../../common/middleware/authorize.middleware";

export class CategoryRouter {
    private readonly router;
    constructor(private categoryController: ICategoryController) {
        this.router = Router();
    }

    init() {
        this.router.route("/create").post(authorize, this.categoryController.create.bind(this.categoryController));
        this.router.route("/delete/:id").delete( authorize, this.categoryController.delete.bind(this.categoryController));
        this.router.route("/update").patch(authorize, this.categoryController.update.bind(this.categoryController));
        this.router.route("/get-all").get(this.categoryController.getAll.bind(this.categoryController));
        return this.router;
    }
}