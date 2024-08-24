import {Request, Response} from "express";
import replyService from "../services/reply.services";

const replyController = {
    handleCreateReply: async (req: Request, res: Response) => {
        const {content, usernameId} = req.body;
        const newReply = await replyService.create({content, usernameId});
        return res.status(201).json({data: newReply});
    },

    handleUpdateReply: async (req: Request, res: Response) => {
        const replyId = req.params.id;
        const {content} = req.body;
        const updatedReply = await replyService.update({replyId, content});
        return res.status(201).json({data: updatedReply});
    },

    handleDeleteReply: async (req: Request, res: Response) => {
        const replyId = req.params.id;
        const deletedReply = await replyService.delete(replyId);
        return res.status(201).json({data: deletedReply});
    },

    handleGetAllReply: async (req: Request, res: Response) => {
        const allReply = await replyService.getAll();
        return res.json({data: allReply});
    }
};

export default replyController;