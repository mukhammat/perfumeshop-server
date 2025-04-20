import { Router } from "express";
import errorHanler from "./common/middleware/error-handler.middleware";

const router = Router();
import bootsrap from "./bootstrap";

const authRouter = bootsrap.createAuth().router;
const perfumeRouter = bootsrap.createPerfume().router;
const categoryRouter = bootsrap.createCategory().router;
const imageRouter = bootsrap.createImage().router;
const userRouter = bootsrap.createUser().router;
const reviewRouter = bootsrap.createReview().router;

router.use("/api/category", categoryRouter);
router.use("/api/auth", authRouter);
router.use("/api/perfume", perfumeRouter);
router.use("/api/image", imageRouter);
router.use("/api/user", userRouter);
router.use("/api/review", reviewRouter);

router.use(errorHanler);
router.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

export default router;
