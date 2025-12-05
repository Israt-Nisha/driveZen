// import { Request, Response } from "express";
// import { userServices } from "./users.service";


// const createUser = async (req: Request, res: Response) => {
//   try {
//     const result = await userServices.createUser(req.body);
//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: result.rows[0],
//     });
//   } catch (err: any) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


// export const userControllers = {
//   createUser,
 
// };