import prisma from './common/config/prisma';
import { AuthController, AuthRouter, AuthService } from './modules/Auth';
import { PerfumeService, PerfumeController, PerfumeRouter } from './modules/Perfume';
import { CategoryService, CategoryController, CategoryRouter } from './modules/Category';
import { ImageService, ImageController, ImageRouter } from './modules/Image';
import { UserService, UserController, UserRouter } from './modules/User';

export default {
    createAuth: () => {
        console.log("Bootsrap Auth")
        const authService = new AuthService(prisma);
        const authController = new AuthController(authService);
        return new AuthRouter(authController);
    },

    createPerfume: () => {
        console.log("Bootsrap Perume")
        const perfumeService = new PerfumeService(prisma);
        const perfumeController = new PerfumeController(perfumeService);
        return new PerfumeRouter(perfumeController);
    },

    createCategory: () => {
        console.log("Bootsrap Category")
        const categoryService = new CategoryService(prisma);
        const categoryController = new CategoryController(categoryService);
        return new CategoryRouter(categoryController);
    },

    createImage: () => {
        console.log("Bootsrap Image")
        const imageService = new ImageService(prisma);
        const imageController = new ImageController(imageService);
        return new ImageRouter(imageController);
    },

    createUser: () => {
        console.log("Bootsrap User")
        const userService = new UserService(prisma);
        const userController = new UserController(userService);
        return new UserRouter(userController);
    }
} 