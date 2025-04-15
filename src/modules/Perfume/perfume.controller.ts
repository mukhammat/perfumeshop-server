import { NextFunction, Request, Response } from "express";
import { IPerfumeService } from ".";

export interface IPerfumeController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getOne(req: Request, res: Response, next: NextFunction): Promise<void>;
    search(req: Request, res: Response, next: NextFunction): Promise<void>;
    getByCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class PerfumeController implements IPerfumeController {
    constructor(private perfumeService: IPerfumeService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, perfume_code, custom_price_per_ml, price_30ml, price_50ml,  description, analog, top_note, middle_note, base_note } =
            req.body;
            if(!name || !perfume_code || !custom_price_per_ml || !analog) throw Error("ошибка валидаций")
            console.log("Start create controller");
            await this.perfumeService.create({
                name,
                perfume_code,
                custom_price_per_ml,
                price_30ml, price_50ml,
                description,
                analog, top_note,
                middle_note,
                base_note
            });
            console.log("End create controller");
            res.status(201).json({ message: "Perfume created" });
        }
        catch (error: any) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const perfumes = await this.perfumeService.getAll();
            res.json(perfumes);
        } catch (error: any) {
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const perfume = await this.perfumeService.getOne(parseInt(id));
            res.json(perfume);
        } catch (error: any) {
            next(error);
        }
    }

    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const perfumes = await this.perfumeService.search(res.locals.validatedData);
            res.json(perfumes);
        } catch (error) {
            next(error);
        }
    }

    async getByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { category_id } = req.params;
            const perfumes = await this.perfumeService.getAll({
                    CategoryPerfume: {
                        // Релизовать вывод по категориям !!!!!!!!!!!!!!!!!
                    }
                });
            res.json(perfumes);
        } catch (error: any) {
            next(error)
        }
    }
}