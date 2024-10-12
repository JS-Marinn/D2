// middleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "Acceso denegado" });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified; // Guarda el usuario verificado en el objeto req
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token no válido" });
    }
};

export default authMiddleware;
