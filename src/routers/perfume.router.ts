import { Router } from "express";

const router = Router();

import { create, getAll, getOne, search } from "../controllers/perfume";

router.get("/get-all", getAll);
router.get("get-one/:id", getOne);
router.post("/create", create);
router.get("/search", search);

export default router;
