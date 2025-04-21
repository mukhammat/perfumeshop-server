import express from "express";
import router from "./routers";
import cors from "cors";
import { config } from "dotenv"; config();

const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
    console.log(`App listening at ${HOST}:${PORT}`);
});
