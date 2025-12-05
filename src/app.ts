import express, { Request, Response } from 'express';
import initDB from './config/db';
import { authRoutes } from './modules/auth/auth.routes';

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the DriveZen!")
});

//auth routes
app.use("/api/v1/auth", authRoutes);


export default app;