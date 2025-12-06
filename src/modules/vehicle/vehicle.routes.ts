import express from "express";
import auth from "../../middleware/auth";
import { vehicleController } from "./vehicle.controller";


const router = express.Router();

router.post("/", auth("admin"), vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicle);
router.get("/:id", vehicleController.getSingleVehicle)
router.put("/:id", auth("admin"), vehicleController.updateVehicle)

export const vehicleRoutes = router;