import bcrypt from "bcrypt"
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username)
            return res
                .status(400)
                .json({ message: "username is req" })

        if (!email)
            return res
                .status(400)
                .json({ message: "email is req" })

        if (!password)
            return res
                .status(400)
                .json({ message: "password is req" })

        const existUser =await User.findOne({ email });

        if (existUser)
            return res
                .status(400)
                .json({ message: "email already exist" })

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier)
            return res.status(400).json({ message: "Email or Username is required" });

        if (!password)
            return res.status(400).json({ message: "Password is required" });

        const existUser = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!existUser)
            return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, existUser.password);

        if (!isMatch)
            return res.status(400).json({ message: "Incorrect Password" });

        const token = jwt.sign(
            {
                id: existUser._id,
                username: existUser.username
            },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existUser._id,
                username: existUser.username
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Error Logging" });
    }
}