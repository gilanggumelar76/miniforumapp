import userRepository from "../repositories/user.repository";
import dotenv from "dotenv"

dotenv.config();

const userService = {
    getAll: async () => {
        try {
            const users = await userRepository.getAll();
            return users;
        } catch (error) {
            throw error;
            console.log("getall services error");
        }
    },
    create: async (userData: {name: string, username: string, email: string, password: string, threadId: string}) => {
        try {
            const newUser = await userRepository.create(userData);
            return newUser;
        } catch (error) {
            throw error;
            console.log("create user services error");
        }
    },

    delete: async (userId: string) => {
        try {
            const deletedUser = await userRepository.delete(userId);
            return deletedUser;
        } catch (error) {
            throw error;
            console.log("delete user services error");
        }
    },

    update: async (updateId: {userId: string, authKey: string | undefined, name: string | undefined, username: string | undefined, email: string | undefined, password: string | undefined, threadId: string}) => {
        try {
            if(updateId.authKey !== process.env.AUTH_KEY) {
                return console.error("invalid auth key");
                
            }
            const updatedUser = await userRepository.update(updateId);
            return updatedUser;
        } catch (error) {
            console.log("update user services error");
        }
    }
};

export default userService;