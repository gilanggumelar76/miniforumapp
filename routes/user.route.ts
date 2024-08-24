import express from "express";
import userController from "../src/controllers/user.controller";

export const userRouter = express.Router();

userRouter.get("/", userController.handleGetAllUsers);
userRouter.post("/", userController.handleCreateUser);
userRouter.patch("/:id", userController.handleUpdateUser);
userRouter.delete("/:id", userController.handleDeleteUser);