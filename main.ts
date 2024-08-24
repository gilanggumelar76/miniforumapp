import express from "express"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { User } from "./src/models/user.schema"
import { Auth } from "./src/models/auth.schema"
import { userRouter } from "./routes/user.route"
import { threadRouter } from "./routes/thread.route"
import { replyRouter } from "./routes/reply.route"


dotenv.config();

mongoose
.connect(process.env.MONGO_OKE as string)
.then(() => console.log("MongoDB Connected"))
.catch(() => console.log("MongoDB Not Connected"));

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/threads", threadRouter);
app.use("/replys", replyRouter);

app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`));

//Login User
app.post("/login", async (req, res) => {

    const {username, password} = req.body;

    if (!username || !password) {
        return res.json({message: "email should be valid minimum 8 characters"});
    }

    const user = await User.findOne({ username });

    if(!user) {
        return res.status(404).json({message: "user not found"});
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password as string);


    if (!isPasswordMatch) {
        return res.status(403).json({message: "invalid Credentials"});
    }

    const payLoad = {
        id: user.id,
        username: user.username
    };

    const accessToken = jwt.sign(payLoad, process.env.SECRET as string, {expiresIn: 60});
    const refreshToken =  jwt.sign(payLoad, process.env.REFRESH_SECRET as string, {expiresIn: "1Day"});

    const newRefreshToken = new Auth ({
        userId: user.id,
        refreshToken,
    });
    await newRefreshToken.save();

    return res
    .cookie("accessToken", accessToken,{httpOnly: true})
    .cookie("refreshToken", refreshToken, {httpOnly: true})
    .status(200).
    json({message: "login success"});

});

// GET RESOURCES ENDPOINT
app.get("/resources", async (req, res) => {

    const { accessToken, refreshToken } = req.cookies;

    if (accessToken) {
        try {

            await jwt.verify(accessToken, process.env.SECRET as string);
            console.log("Access Token Valid");
            return res.json({message: "Ini data user"});

        } catch (error) {
            if(!refreshToken) {
                console.log("REFRESH TOKEN TIDAK ADA");
                return res.status(401).json({
                    message:"please re-login ACCES TOKEN GA ADA WAJIB REGENERATE DARI REFRESH TOKEN"});
            }     

            try {
                console.log("VERIVIFY REFRESH TOKEN");
                
                await jwt.verify(refreshToken, process.env.REFRESH_SECRET as string);
                console.log("CHECK REFRESH TOKEN KE DATABASE");
                const activeRefreshToken = await Auth.findOne({refreshToken});

                if(!activeRefreshToken) {
                    console.log("REFRESH TOKEN TIDAK ADA DI DALAM DATABASE");
                    
                    return res.status(401).json({message: "please re-login REFRESH TOKEN UDAH GA ADA"});
                }

                const payLoad = jwt.decode(refreshToken) as {id: string, username: string};
                console.log("BIKIN AKSES TOKEN BARU");
                console.log(payLoad);

                const newAccessToken = jwt.sign({
                    id: payLoad.id,
                    username: payLoad.username
                }, process.env.SECRET as string, {expiresIn: 60});
                return res.cookie("accessToken", newAccessToken, {httpOnly: true}).json({message: "re-generate access token"});

            } catch (error) {
                return res.status(401).json({message: "please re-login JIKA REFRESH TOKEN GA ADA DIDATABASE"});
            }
        }   
    }

});

//Logout User
app.post("/logout", async (req, res) => {
    const {refreshToken} = req.cookies;
    await Auth.findOneAndDelete({refreshToken});
    return res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({message: "Logout Success"});
});