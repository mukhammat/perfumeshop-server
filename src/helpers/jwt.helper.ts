import jwt from "jsonwebtoken";

interface JwtPayload {
    [key: string]: any;
}

const secretKey = process.env.SECRET_KEY || "secretKey";

export const jwtGenerate = (payload:JwtPayload, expiresIn = "24h") => {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
};