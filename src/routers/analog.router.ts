import { Router } from "express";

const router = Router();

import { create, destroy, update } from "../controllers/analog";

router.post("/create", create);
router.delete("/delete/:id", destroy);
router.patch("/update", update);

export default router;
