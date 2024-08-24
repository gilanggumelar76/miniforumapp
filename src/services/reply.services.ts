import replyRepository from '../repositories/reply.repository';

const replyService = {
    create: async (replyData: {content: string, usernameId: string}) => {
        try {
            const newReply = await replyRepository.create(replyData);
            return newReply;
        } catch (error) {
            throw error;
            console.log("cannot create reply from database");
        } 
    },
    getAll: async () => {
        try {
            const replies = await replyRepository.getAll();
            return replies;
        } catch (error) {
            throw error;
            console.log("cannot get all reply from database");
        }
    },

    delete: async (replyId: string) => {
        try {
            const reply = await replyRepository.delete(replyId);
            return reply;
        } catch (error) {
            throw error;
            console.log("cannot delete reply from database");
        } 
    },

    update: async (updateId: {replyId: string, content: string | undefined}) => {
        try {
            const updatedReply = await replyRepository.update(updateId);
            return updatedReply;
        } catch (error) {
            throw error;
            console.log("cannot update reply from database");
        }
    }
};

export default replyService;