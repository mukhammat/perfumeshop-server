import { NextFunction, Request, Response, Router } from "express";
import { IImageService } from ".";

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
        this.router.route("/create").post(this.create.bind(this));
        this.router.route("/delete/:id").delete(this.delete.bind(this));
        this.router.route("/update/:id").patch(this.update.bind(this));
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { image_path, perfume_id }:{image_path:string; perfume_id: number;} = req.body;
            await this.imageService.create({image_path, perfume_id});
            res.status(201).json({ message: "Image created" });
        } catch (error: any) {
            next(error);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.imageService.delete(Number(id));
            res.status(201).json({ message: "Image deleted" });
        } catch (error: any) {
            next(error);
        }
    }

    private async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, image_path } = req.params;
            await this.imageService.update(Number(id), image_path);
            res.status(201).json({ message: "Image updated" });
        } catch (error: any) {
            next(error);
        }
    }
}