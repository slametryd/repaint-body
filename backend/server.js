import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoutes from "./controllers/product_rout.js";
import bookingRoutes from "./controllers/booking_routes.js";
import motorOptions from "./controllers/motorOptions.js";
import paymentRoutes from "./controllers/payment.js";

dotEnv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: `http://localhost:5173`,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/api/auth", router);
app.use("/api", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api", bookingRoutes); // di file server.js
app.use("/api", motorOptions);
app.use("/api", paymentRoutes);

try {
  await db.authenticate();
  await db.sync();
  console.log(`Database connected...`);
} catch (error) {
  console.log("Database connection failed:", error);
}

app.listen(5000, () => console.log(`Server running at port 5000`));
