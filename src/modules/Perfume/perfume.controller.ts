import { NextFunction, Request, Response, Router } from "express";
import { IPerfumeService, searchSchema } from ".";
import { validate, checkAdmin, authorize, asyncWrapper } from "@middleware"

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
        this.router
        .post("/create", authorize, checkAdmin, this.create)
        .get("/get-all", this.getAll)
        .get("/get-one/:id", this.getOne)

        .get(
            "/search",
            validate(searchSchema, "query"),
            this.search
        )

        .get("/get-by-category/:category_id", this.getByCategory)
    }

    private create = asyncWrapper(async (req: Request, res: Response) => {
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

    })

    private getAll = asyncWrapper(async (_: unknown, res: Response, next: NextFunction) => {
        const perfumes = await this.perfumeService.getAll();
        res.json(perfumes);
    })

    private getOne = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const perfume = await this.perfumeService.getOne(parseInt(id));
        res.json(perfume);
    })

    private search = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const perfumes = await this.perfumeService.search(res.locals.validatedData);
        res.json(perfumes);
    })

    private getByCategory = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { category_id } = req.params;
        const perfumes = await this.perfumeService.getAll({
            CategoryPerfume: {
                // Релизовать вывод по категориям !!!!!!!!!!!!!!!!!
            }
        });
        res.json(perfumes);
    })
}