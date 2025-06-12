import { NextFunction, Request, Response, Router } from "express";
import { ICategoryService } from ".";
import { authorize } from "@middleware";

export interface ICategoryController {
    router: Router
}

export class CategoryController {
    public readonly router;
    constructor(private categoryService: ICategoryService) {
        this.router = Router();
        this.routes();
    }

    private routes() {
            this.router
            .post("/create", authorize, this.create.bind(this))
            .delete("/delete/:id", authorize, this.delete.bind(this))
            .patch("/update/:id", authorize, this.update.bind(this))
            .get("/get-all", this.getAll.bind(this));
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            await this.categoryService.create(name);
            res.status(201).json({
                message: "Category created",
                //categoryId: category.id,
            });
        } catch (error: unknown) {
            next(error)
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.categoryService.delete(Number(id));
            res.json({
                message: "Category deleted",
            });
        } catch (error: any) {
            next(error);
        }
    }

    private async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name } = req.body;
            await this.categoryService.update(id, name);
            res.status(200).json({ message: "Content is updated!" });
        } catch (error: any) {
            next(error);
        }
    }

    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryService.getAll();
            res.status(200).json(categories);
        } catch (error: any) {
            next(error);
        }
    }
}