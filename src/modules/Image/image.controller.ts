import { NextFunction, Request, Response, Router } from "express";
import { IImageService } from ".";
import { asyncWrapper, authorize, checkAdmin } from "@middleware";

export interface IImageController {
    router: Router;
}

export class ImageController implements IImageController {
    public readonly router;
    constructor(private imageService: IImageService) {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
        .use(authorize)
        .use(checkAdmin)

        .post("/create", this.create)

        .delete("/delete/:id", this.delete)

        .patch("/update/:id", this.update)
    }

    private create = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { image_path, perfume_id }:{image_path:string; perfume_id: number;} = req.body;

        await this.imageService.create({image_path, perfume_id});

        res.status(201).json({ message: "Image created" });
    });

    private delete = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        await this.imageService.delete(Number(id));

        res.status(201).json({ message: "Image deleted" });
    });

    private update = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        const { id, image_path } = req.params;

        await this.imageService.update(Number(id), image_path);
        
        res.status(201).json({ message: "Image updated" });
    });
}