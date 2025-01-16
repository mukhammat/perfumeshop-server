import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import errorHanler from "../middleware/error-handler";

const router = Router();

import perfumeRouter from "./perfume.router";
import categoryRouter from "./category.router";

router.use("/perfume", perfumeRouter);
router.use("/category", categoryRouter);

router.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

router.use(errorHanler);

export default router;
