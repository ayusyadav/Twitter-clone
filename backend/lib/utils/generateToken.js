import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const Token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
    res.cookie("jwt", Token, {
        maxAge: 15 * 24 *60 *1000, // 15 days in milliseconds
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        secure: process.env.NODE_ENV !== "development", // only send cookie over https
        sameSite: "strict" // prevent CSRF attacks cross-site request forgery attacks
    });

};