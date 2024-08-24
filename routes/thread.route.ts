import express from "express";
import threadController from "../src/controllers/thread.controller";

export const threadRouter = express.Router();

threadRouter.get("/", threadController.handleGetAllThreads);
threadRouter.post("/", threadController.handleCreateThread);
threadRouter.patch("/:id", threadController.handleUpdateThread);
threadRouter.delete("/:id", threadController.handleDeleteThread);