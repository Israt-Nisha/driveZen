import express, { Request, Response } from 'express';
import initDB from './config/db';

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
     res.status(200).json({
    message: "This is the root route",
    path: req.path,
  });
})


export default app;