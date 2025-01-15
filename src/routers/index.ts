import { Router } from "express";

const router = Router();

import perfumeRouter from "./perfume.router";

router.use("/perfume", perfumeRouter);

router.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

export default router;
