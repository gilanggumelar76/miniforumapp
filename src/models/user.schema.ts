import {model, Schema} from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    threadId: String
});

export const User = model("User", userSchema);

const threadSchema = new Schema({
    title: String,
    content: String,
    replyId: {type: Schema.Types.ObjectId, ref: "User"}
});

export const Thread = model("Thread", threadSchema);

const replySchema = new Schema({
    content: String,
    usernameId: {type: Schema.Types.ObjectId, ref: "Reply"}
});

export const Reply = model("Reply", replySchema);