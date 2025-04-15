import { NextFunction, Request, Response } from "express";
import { ICategoryService } from ".";

export interface ICategoryController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class CategoryController {
    constructor(private categoryService: ICategoryService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const category = await this.categoryService.create(name);
            res.status(201).json({
                message: "Category created",
                //categoryId: category.id,
            });
        } catch (error: any) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
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

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name } = req.body;
            await this.categoryService.update(id, name);
            res.status(200).json({ message: "Content is updated!" });
        } catch (error: any) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoryService.getAll();
            res.status(200).json(categories);
        } catch (error: any) {
            next(error);
        }
    }
}