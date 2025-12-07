import express from "express";
import auth from "../../middleware/auth";
import { bookingContorller } from "./booking.contorller";


const router = express.Router();

router.post("/", auth("admin","customer"), bookingContorller.createBooking);
router.get("/", auth('admin', 'customer'), bookingContorller.getAllBooking);
router.put("/:id", auth('admin', 'customer'), bookingContorller.updateBooking);

export const bookinRoutes = router;""