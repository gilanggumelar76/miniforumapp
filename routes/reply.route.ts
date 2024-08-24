import express from "express";
import replyController from "../src/controllers/reply.controller";

export const replyRouter = express.Router();

replyRouter.get("/", replyController.handleGetAllReply);
replyRouter.post("/", replyController.handleCreateReply);
replyRouter.patch("/:id", replyController.handleUpdateReply);
replyRouter.delete("/:id", replyController.handleDeleteReply);