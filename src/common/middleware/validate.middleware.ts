import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Расширяем интерфейс Request
declare global {
  namespace Express {
    interface Request {
      validated: unknown;
    }
  }
}

type ZodRequestParts = 'body' | 'query' | 'params';

export const validate = 
  <T>(schema: ZodSchema<T>, part: ZodRequestParts = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req[part]);
      req.validated = result as T;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      next(err);
    }
  };