import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0],
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getAllVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicle();

        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: result.rows,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicles retrieved successfully",
                data: result.rows,
            });
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err,
        });
    }
};

const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getSingleVehicle(req.params.id!);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Not Found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

const updateVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.updateVehicle(req.body, req.params.id!);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Not Found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};


export const vehicleController = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle,
}