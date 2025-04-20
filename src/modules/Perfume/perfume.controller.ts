import { NextFunction, Request, Response, Router } from "express";
import { IPerfumeService, searchSchema } from ".";
import { validate, authorize } from "../../common/middleware"

export interface IPerfumeController {
    router: Router;
}

export class PerfumeController implements IPerfumeController {
    public readonly router: Router;
    constructor(private perfumeService: IPerfumeService) {
        this.router = Router();
        this.routes();
    }

    private routes() {
            this.router.route("/create").post(this.create.bind(this));
            this.router.route("/get-all").get(this.getAll.bind(this));
            this.router.route("/get-one/:id").get(this.getOne.bind(this));
            this.router.get(
              "/search",
              validate(searchSchema, "query"),
              this.search.bind(this));
            this.router.route("/get-by-category/:category_id").get(this.getByCategory.bind(this));
    }

    private async create(req: Request, res: Response, next: NextFunction) {
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

    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const perfumes = await this.perfumeService.getAll();
            res.json(perfumes);
        } catch (error: any) {
            next(error);
        }
    }

    private async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const perfume = await this.perfumeService.getOne(parseInt(id));
            res.json(perfume);
        } catch (error: any) {
            next(error);
        }
    }

    private async search(req: Request, res: Response, next: NextFunction) {
        try {
            const perfumes = await this.perfumeService.search(res.locals.validatedData);
            res.json(perfumes);
        } catch (error) {
            next(error);
        }
    }

    private async getByCategory(req: Request, res: Response, next: NextFunction) {
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