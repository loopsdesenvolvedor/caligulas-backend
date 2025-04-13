import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({
      err: err.message,
    });

    return;
  }

  res.status(500).json({
    status: "Error",
    message: "Internal server error",
  });

  return;
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on port: ${process.env.PORT} `);
});
