import { NextFunction, Request, Response } from "express";
import { IImageService } from ".";

export interface IImageController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>
    delete(req: Request, res: Response, next: NextFunction): Promise<void>
    update(req: Request, res: Response, next: NextFunction): Promise<void>
}

export class ImageController implements IImageController {
    constructor(private imageService: IImageService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { image_path, perfume_id }:{image_path:string; perfume_id: number;} = req.body;
            await this.imageService.create({image_path, perfume_id});
            res.status(201).json({ message: "Image created" });
        } catch (error: any) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.imageService.delete(Number(id));
            res.status(201).json({ message: "Image deleted" });
        } catch (error: any) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, image_path } = req.params;
            await this.imageService.update(Number(id), image_path);
            res.status(201).json({ message: "Image updated" });
        } catch (error: any) {
            next(error);
        }
    }
}