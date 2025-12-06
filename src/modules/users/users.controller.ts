import { Request, Response } from "express";
import { userServices } from "./users.service";
import { JwtPayload } from "jsonwebtoken";

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            datails: err,
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {

        const loggedInUser = req.user!;
        const targetUserId = req.params.id!;
        const updateData = req.body;

        if (loggedInUser.role === "customer" && loggedInUser.id !== targetUserId) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
      

        const result = await userServices.updateUser(updateData, targetUserId);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Not Found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0],
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};




export const userControllers = {
    getUser,
    updateUser

};