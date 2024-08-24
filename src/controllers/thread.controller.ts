import { Request, Response } from "express";
import threadService from "../services/thread.services";

const threadController = {
    handleGetAllThreads: async (req: Request, res: Response) => {
        const allThreads = await threadService.getAll();
        return res.json({data: allThreads});
    },

    handleCreateThread: async (req: Request, res: Response) => {
        const {title, content, replyId} = req.body;
        const newThread = await threadService.create({title, content, replyId});
        return res.status(201).json({data: newThread});
    },

    handleDeleteThread: async (req: Request, res: Response) => {
        const userThreadId = req.params.id;
        const deletedThread = await threadService.delete(userThreadId);
        return res.status(201).json({data: deletedThread});
    },

    handleUpdateThread: async (req: Request, res: Response) => {
        const userThreadId = req.params.id;
        const {title, content, replyId} = req.body;
        const threadUpateId = {userThreadId, title, content, replyId};
        const updatedThread = await threadService.update(threadUpateId);
        return res.status(201).json({data: updatedThread});
    }
};

export default threadController;