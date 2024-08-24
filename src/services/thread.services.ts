import threadRepository from "../repositories/thread.repository";

const threadService = {
    getAll: async () => {
        try {
            const threads = await threadRepository.getAll();
            return threads;
        } catch (error) {
            throw error;
            console.log("getall services error");
        } 
    },
    create: async (newThreadData: {title: string, content: string, replyId: string}) => {
        try {
            const newThread = await threadRepository.create(newThreadData);
            return newThread;
        } catch (error) {
            throw error;
            console.log("create thread services error");
        }
    },
    delete: async (userThreadId: string) => {
        try {
            const deletedThread = await threadRepository.delete(userThreadId);
            return deletedThread;
        } catch (error) {
            throw error;
            console.log("delete thread services error");
        }
    },

    update: async (updateId: {userThreadId: string, title: string | undefined, content: string | undefined, replyId: string}) => {
        try {
            const updatedThread = await threadRepository.update(updateId);
            return updatedThread;
        } catch (error) {
            throw error;
            console.log("update thread services error");
        }
    }
};

export default threadService;