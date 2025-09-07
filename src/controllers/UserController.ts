import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { registerSchema, userUpdateSchema, loginSchema } from "../schemas/userSchema.js";
import { StatusCodes } from "http-status-codes";

const User = new UserService();

export const UserController = {
    async login(req: Request, res: Response) {
        const credentials = loginSchema.parse(req.body);
        const token = await User.login(credentials);
        console.log(token)
        res.status(StatusCodes.OK).json(token);
    },

    async register(req: Request, res: Response) {
        const data = registerSchema.parse(req.body);
        const user = await User.createUser(data);
        res.status(StatusCodes.CREATED).json(user);
    },

    async getAll(req: Request, res: Response) {
        const users = await User.getAllUsers();
        res.status(StatusCodes.OK).json(users);
    },

    async getUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.getUserById(id);
        res.status(StatusCodes.OK).json(user);
    },

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const data = userUpdateSchema.parse(req.body);
        const user = await User.updateUser(id, data);
        res.status(201).json(user);
    },

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        await User.deleteUser(id);
        res.status(StatusCodes.NO_CONTENT).json();
    }
};