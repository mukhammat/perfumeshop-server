import { Router } from "express";

const router = Router();

import { create, getAll, getOne, search } from "../controllers/perfume";

router.get("/get-all", getAll);
router.get("get-one/:id", getOne);
router.post("/create", create);
router.get("/search", search);
// POST /api/perfumes/:perfumeId/analogs - Добавить аналог к парфюму
// DELETE /api/perfumes/:perfumeId/analogs/:analogId - Удалить аналог из парфюма

export default router;
