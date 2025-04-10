import { Router } from "express";
import errorHanler from "./common/middleware/error-handler.middleware";

const router = Router();
import bootsrap from "./bootstrap";

const authRouter = bootsrap.createAuth().init();
const perfumeRouter = bootsrap.createPerfume().init();
const categoryRouter = bootsrap.createCategory().init();
const imageRouter = bootsrap.createImage().init();
const userRouter = bootsrap.createUser().init();

router.use("/api/category", categoryRouter);
router.use("/api/auth", authRouter);
router.use("/api/perfume", perfumeRouter);
router.use("/api/image", imageRouter);
router.use("/api/user", userRouter);

router.use(errorHanler);
router.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

export default router;
