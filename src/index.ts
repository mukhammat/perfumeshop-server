import express from "express";
import router from "./routers";
import cors from "cors";
import { config } from "dotenv"; config();

const app = express();
const {HOST, PORT} = process.env;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
    console.log(`App listening at ${HOST}:${PORT}`);
});
