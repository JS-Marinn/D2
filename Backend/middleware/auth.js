// auth.js
import jwt from 'jsonwebtoken';

export const verificarAutenticacion = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "Acceso denegado" });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified; // Guarda el usuario verificado en el objeto req
        next();
    } catch (error) {
        res.status(400).json({ msg: "Token no válido" });
    }
};

export const verificarAdministrador = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        next();
    } else {
        res.status(403).json({ msg: "Acceso denegado: No eres administrador" });
    }
};