import express, { Request, Response } from 'express';
import initDB from './config/db';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/users/users.routes';
import { vehicleRoutes } from './modules/vehicle/vehicle.routes';
import { bookinRoutes } from './modules/booking/booking.routes';

const app = express();

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the DriveZen!")
});

//auth routes
app.use("/api/v1/auth", authRoutes);

//users routes
app.use("/api/v1/users", userRoutes);

// vehicle routes
app.use("/api/v1/vehicles", vehicleRoutes);

// booking routes
app.use("/api/v1/bookings", bookinRoutes);


export default app;