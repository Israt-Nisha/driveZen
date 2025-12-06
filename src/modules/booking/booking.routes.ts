import express from "express";
import auth from "../../middleware/auth";
import { bookingContorller } from "./booking.contorller";


const router = express.Router();

router.post("/", auth("admin","customer"), bookingContorller.createBooking);
router.get("/", auth('admin', 'customer'), bookingContorller.getAllBooking);

export const bookinRoutes = router;""