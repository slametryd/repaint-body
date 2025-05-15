import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotEnv.config();
const app = express();

app.use(cors({ credentials: true, origin: `http://localhost:5173` }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/api/auth", router);

try {
  await db.authenticate();
  await db.sync();
  console.log(`Database connected...`);
} catch (error) {
  console.log("Database connection failed:", error);
}

app.listen(5000, () => console.log(`Server running at port 5000`));
