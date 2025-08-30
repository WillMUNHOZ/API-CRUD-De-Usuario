import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { userSchema } from "../schemas/UserSchema";

const User = new UserService();

export const UserController = {
    async getAll(req: Request, res: Response) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await User.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async createUser(req: Request, res: Response) {
        try {
            const data = userSchema.parse(req.body);
            const user = await User.createUser(data);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = userSchema.parse(req.body);
            const user = await User.updateUser(id, data);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await User.deleteUser(id);
            res.status(200).json({ message: "User deleted" });
        } catch (error) {
            res.status(400).json({ error: error.errors || error.message });
        }
    }
};