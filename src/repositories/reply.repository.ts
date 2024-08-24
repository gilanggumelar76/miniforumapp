import { Reply } from "../models/user.schema";

const replyRepository = {
    create: async (replyData: {content: string, usernameId: string}) => {
        try {
            const newReply = new Reply(replyData);
            await newReply.save();
            return newReply;
        } catch (error) {
            throw error;
            console.log("cannot create reply from database");
        } 
    },
    getAll: async () => {
        try {
            const replies = await Reply.find().populate("usernameId");
            return replies;
        } catch (error) {
            throw error;
            console.log("cannot get all reply from database");
        }
    },
    delete: async (replyId: string) => {
        try {
            const reply = await Reply.findByIdAndDelete(replyId);
            return reply;
        } catch (error) {
            throw error;
            console.log("cannot delete reply from database");
        } 
    },

    update: async (updateId: {replyId: string, content: string | undefined}) => {
        try {
            const updatedReply = await Reply.findByIdAndUpdate(updateId.replyId, {content: updateId.content});
            return updatedReply;
        } catch (error) {
            throw error;
            console.log("cannot update reply from database");
        }
    }
};

export default replyRepository;