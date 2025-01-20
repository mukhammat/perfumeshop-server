import jwt from "jsonwebtoken";

interface JwtPayload {
    [key: string]: any;
}

const secretKey = process.env.SECRET_KEY || "secretKey";

/**
 * Генерация JWT токена
 * @param payload Полезная нагрузка токена
 * @param expiresIn Время жизни токена
 * @returns JWT токен
 */

export const jwtGenerate = (payload:JwtPayload, expiresIn = "24h") => {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
};