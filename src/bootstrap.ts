import prisma from './common/config/prisma';
import { AuthController, AuthService } from './modules/Auth';
import { PerfumeService, PerfumeController } from './modules/Perfume';
import { CategoryService, CategoryController } from './modules/Category';
import { ImageService, ImageController } from './modules/Image';
import { UserService, UserController } from './modules/User';
import { ReviewService, ReviewController } from './modules/Review';

export default {
    createAuth: () => {
        console.log("Bootsrap Auth")
        const authService = new AuthService(prisma);
        return new AuthController(authService);
    },

    createPerfume: () => {
        console.log("Bootsrap Perume")
        const perfumeService = new PerfumeService(prisma);
        return new PerfumeController(perfumeService);
    },

    createCategory: () => {
        console.log("Bootsrap Category")
        const categoryService = new CategoryService(prisma);
        return new CategoryController(categoryService);
    },

    createImage: () => {
        console.log("Bootsrap Image")
        const imageService = new ImageService(prisma);
        return new ImageController(imageService);
    },

    createUser: () => {
        console.log("Bootsrap User")
        const userService = new UserService(prisma);
        return new UserController(userService);
    },
    createReview: () => {
        console.log("Bootsrap User")
        const reviewService = new ReviewService(prisma);
        return new ReviewController(reviewService);
    }
} 