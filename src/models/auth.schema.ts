import { model, Schema } from "mongoose";

const AuthSchema = new Schema({
    userId: String,
    refreshToken: String
});

export const Auth = model("Auth", AuthSchema);