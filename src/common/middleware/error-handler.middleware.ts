import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { HttpException } from "../exceptions";

/**
 * Централизованный обработчик ошибок для приложения Express.
 */
const errorHanler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(error);
    let status = 500;
    let errorMessage = "Internal server error";

    if (error instanceof HttpException) {
        status = error.status;
        errorMessage = error.message;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                status = 400;
                errorMessage = "It's already exists";
                break;
            case "P2025":
                status = 404;
                errorMessage = "Record to delete does not exist.";
                break;
            case "P2003":
                status = 400;
                errorMessage = "Foreign key constraint violated";
                break;
            default:
                status = 500;
                errorMessage = "Internal server error";
                break;
        }
    }

    res.status(status).json({
        error: {
            message: errorMessage,
        },
    });
};

export default errorHanler;
