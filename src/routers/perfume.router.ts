import { Router } from "express";

const router = Router();

import { Perfume } from "../controllers";

router.get("/get-all", Perfume.getAll);
router.get("get-one/:id", Perfume.getOne);
router.post("/create");
router.put("/update/:id");
router.delete("/delete/:id");

export default router;
