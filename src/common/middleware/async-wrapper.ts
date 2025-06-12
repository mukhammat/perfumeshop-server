import { Request, Response, NextFunction } from "express";

/**
 * Обёртка для обработки асинхронных функций.
 * Обеспечивает централизованную обработку ошибок.
 * @param fn Асинхронная функция Express (контроллер)
 * @returns Express middleware с обработкой ошибок
 */
export const asyncWrapper = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
