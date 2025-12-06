import express, { Request, Response } from 'express';
import initDB from './config/db';
import { authRoutes } from './modules/auth/auth.routes';
import { UserRoutes } from './modules/users/users.routes';

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the DriveZen!")
});

//auth routes
app.use("/api/v1/auth", authRoutes);

//users CRUD
app.use("/api/v1/users", UserRoutes);


export default app;