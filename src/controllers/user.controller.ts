import { Request, Response } from "express";
import userService from "../services/user.services";

const userController = {
    handleGetAllUsers: async (req: Request, res: Response) => {
        const allUser = await userService.getAll();
        return res.json({data: allUser});
    },

    handleCreateUser: async (req: Request, res: Response) => {
        const {name, username, email, password, threadId} = req.body;
        const newUser = await userService.create({name, username, email, password, threadId});
        return res.status(201).json({data: newUser});
    }, 

    handleUpdateUser: async (req: Request, res: Response) => {
        const userId = req.params.id;
        const authKey = req.headers.authorization;
        const {name, username, email, password, threadId} = req.body;
        const upateId = {userId, authKey, name, username, email, password, threadId};
        const updatedUser = await userService.update(upateId);
        return res.status(201).json({data: updatedUser});
    },

    handleDeleteUser: async (req: Request, res: Response) => {
        const userId = req.params.id;
        const deletedUser = await userService.delete(userId);
        return res.status(201).json({data: deletedUser});
    }
};

export default userController;