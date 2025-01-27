import jwt, {JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Расширяем интерфейс Request, чтобы добавить свойство admin
declare module "express" {
    export interface Request {
        admin?: JwtPayload | string;
    }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.headers.authorization?.replace(/^Bearer\s/, ""); // Извлекаем токен

    try {

        if (!token) {
            res.status(403).json({ message: "Нет доступа" });
            return;
        }

        const adminSecretKey = process.env.SECRET_KEY;
        if (!adminSecretKey) {
            throw new Error("Секретный ключ не задан в переменных окружения");
        }

        // Проверяем токен и декодируем его
        const decoded = jwt.verify(token, adminSecretKey);
        req.admin = decoded; // Сохраняем декодированные данные в req.admin

        next(); // Передаем управление следующему middleware
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Токен просрочен" });
            return;
        }

        if(err instanceof Error) {
            res.status(401).json({ message: err.message });
            return;
        }

        res.status(401).json({ message: "Нет авторизации" });
        return
    }
};
