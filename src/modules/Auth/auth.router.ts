import { Router } from "express";
import { IAuthController } from ".";

export class AuthRouter {
  private readonly router;
  constructor(private authController: IAuthController) {
    this.router = Router();
  }

  init() {
    this.router.route("/login").post(this.authController.login.bind(this.authController));
    this.router.route("/register").post(this.authController.register.bind(this.authController));
    return this.router;
  }
}