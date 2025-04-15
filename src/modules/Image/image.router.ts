import { Router } from "express";
import { IImageController } from ".";

export class ImageRouter {
  private readonly router;
  constructor(private imageController: IImageController) {
    this.router = Router();
  }

  init() {
    this.router.route("/create").post(this.imageController.create.bind(this.imageController));
    this.router.route("/delete/:id").delete(this.imageController.delete.bind(this.imageController));
    this.router.route("/update/:id").patch(this.imageController.update.bind(this.imageController));
    return this.router;
  }
}