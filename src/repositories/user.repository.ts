import { User } from "../models/user.schema";
import bcrypt from "bcrypt";

const userRepository = {
    getAll: async () => {
        try {
            const users = await User.find().populate("threadId");
            return users;
        } catch (error) {
            throw error;
            console.log("cannot get from database");
        }
},

    create: async (userData: {name: string, username: string, email: string, password: string}) => {
        try { 
            const newUser = new User(userData);
            const userDataHash = await bcrypt.hash(userData.password, 10);
            newUser.password = userDataHash;
            await newUser.save();

            return newUser;

        } catch (error) {
            throw error;
            console.log("cannot create user from database");
        }
    },

    delete: async (userId: string) => {
        try {
            const user = await User.findByIdAndDelete(userId);
            return user;
        } catch (error) {
            throw error;
            console.log("cannot delete user from database");
        }
    },

    update: async (updateId: {userId: string, authKey: string | undefined, name: string | undefined, username: string | undefined, email: string | undefined, threadId: string}) => {
        try {
            const user = await User.findByIdAndUpdate(updateId.userId, {name: updateId.name, username: updateId.username, email: updateId.email, threadId: updateId.threadId});
            return user;
        } catch (error) {
            console.log("cannot update user from database");
        }
    }
};

export default userRepository;