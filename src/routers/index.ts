import { Router } from "express";
import errorHanler from "../middleware/error-handler";

const router = Router();

import perfumeRouter from "./perfume.router";
import categoryRouter from "./category.router";
import analogRouter from "./analog.router";
import adminRouter from "./admin.router";

router.use("/perfume", perfumeRouter);
router.use("/category", categoryRouter);
router.use("/analog", analogRouter);
router.use("/admin", adminRouter);

router.use(errorHanler);
router.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

export default router;
