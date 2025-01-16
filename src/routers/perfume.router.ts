import { Router } from "express";

const router = Router();

import { create, getAll, getOne } from "../controllers/perfume";

router.get("/get-all", getAll);
router.get("get-one/:id", getOne);
router.post("/create", create);

export default router;
