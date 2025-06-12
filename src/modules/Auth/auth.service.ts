import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IAuthService {
    register(name: string, email: string, password: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
}


export class AuthService implements IAuthService {
    private saltRounds = 10;
    private secretKey = process.env.SECRET_KEY;

    constructor(private prisma: PrismaClient) {}

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    private generateJwt(payload: JwtPayload, expiresIn = "24h"): string {
        if(!this.secretKey) {
            throw new Error("Secret key is not defined");
        }
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    public async register(name: string, email: string, password: string) {
        const hash = await this.hashPassword(password);
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hash,
            }
        });
        
        return this.generateJwt({ id: user.id, name: user.name, email: user.email, isAdmin: user.is_admin });
    }

    public async login(email:string, password:string) {
        const user = await this.prisma.user.findUnique({
            where: {
              email
            }
        });

        if(!user) {
            throw new Error("User not found");
        }
    
        const isValidPass = await this.comparePassword(password, user.password);
    
        if(!isValidPass) {
            throw new Error("Invalid password");
        }
        
        return this.generateJwt({id: user.id,name: user.name, email: user.email, isAdmin: user.is_admin});
    }
}
