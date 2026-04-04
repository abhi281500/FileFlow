import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorised request! Token missing." });
        }

        // Token verify karna
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');

        // Request object mein user ki info daal dena
        // Taaki controller mein hum 'req.user.id' use kar sakein
        req.user = decodedToken;

        //  Agle function (Controller) par jao
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};