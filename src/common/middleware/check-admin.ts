import { Request, Response, NextFunction } from "express"

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = res.locals.user;
        console.log(res.locals.user)
        if (!id) {
            res.status(401).json({ message: "No user ID provided" });
            return;
        }

        if(!res.locals.user.isAdmin) {
            res.status(403).json({ message: "Access denied" });
            return;
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'No access' });
    }
}