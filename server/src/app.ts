import express from "express";
import cors from "cors";
import fileRouter from "./routes/v1/file.routes";
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors(corsOptions));

app.use("/api/v1/file", fileRouter);

app.use(errorHandler);

export default app;
