import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { registerSchema, userUpdateSchema, loginSchema } from "../schemas/userSchema.js";

const User = new UserService();

export const UserController = {
    async login(req: Request, res: Response) {
        try {
            const credentials = loginSchema.parse(req.body);
            const token = await User.login(credentials);
            console.log(token)
            res.status(200).json(token);
        } catch (error: any) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async register(req: Request, res: Response) {
        try {
            const data = registerSchema.parse(req.body);
            const user = await User.createUser(data);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await User.getUserById(id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = userUpdateSchema.parse(req.body);
            const user = await User.updateUser(id, data);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await User.deleteUser(id);
            res.status(200).json({ message: "User deleted" });
        } catch (error: any) {
            res.status(400).json({ error: error.errors || error.message });
        }
    }
};