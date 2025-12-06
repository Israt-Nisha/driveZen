import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    try {
        const { booking, vehicle } = await bookingService.createBooking(req.body);

        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: {
                ...booking,
                vehicle: {
                    vehicle_name: vehicle.vehicle_name,
                    daily_rent_price: vehicle.daily_rent_price,
                },
            },
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err,
        });

    }
}

const getAllBooking = async (req: Request, res: Response) => {
    try {

        const loggedUser = req.user!;
        const bookings = await bookingService.getAllBooking(loggedUser);

        const message =
            loggedUser.role === "admin"
                ? "Bookings retrieved successfully"
                : "Your bookings retrieved successfully";

        res.status(200).json({
            success: true,
            message,
            data: bookings,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const bookingContorller = {
    createBooking,
    getAllBooking,

}