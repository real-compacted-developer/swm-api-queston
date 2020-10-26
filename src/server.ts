import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import BaseRouter from "./routes";
import logger from "./utils/logger";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/", BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(400).json({
    error: err.message,
  });
});

export default app;
