import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
    userId?: string
}

interface MyJwtPayload extends JwtPayload {
    id: string;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized access." })
    };

    const token = authHeader.split(" ")[1];

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is required");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as MyJwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid token." });
    }
} 