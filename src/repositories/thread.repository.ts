import { Thread } from "../models/user.schema";

const threadRepository = {
    getAll: async () => {
        try {
            const threads = await Thread.find().populate("replyId");
            return threads;
        } catch (error) {
            throw error;
            console.log("cannot get all thread from database");
        }
    },

    create: async (newThreadData: {title: string, content: string, replyId: string}) => {
        try {
            const newThread = new Thread(newThreadData);
            await newThread.save();
            return newThread;
        } catch (error) {
            throw error;
            console.log("cannot create thread from database");
        } 
    },

    delete: async (threadId: string) => {
        try {
            const thread = await Thread.findByIdAndDelete(threadId);
            return thread;
        } catch (error) {
            throw error;
            console.log("cannot delete thread from database");
        }
    },

    update: async (updateId: {userThreadId: string, title: string | undefined, content: string | undefined, replyId: string}) => {
        try {
            const updatedThread = await Thread.findByIdAndUpdate(updateId.userThreadId, {title: updateId.title, content: updateId.content, replyId: updateId.replyId});
            return updatedThread;
        } catch (error) {
            throw error;
            console.log("cannot update thread from database");
        }
    }
};

export default threadRepository;