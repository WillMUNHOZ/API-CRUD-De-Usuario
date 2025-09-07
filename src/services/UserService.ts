import mongoose from "mongoose";
import { UserRepository } from "../repositories/UserRepository.js"
import { IUser } from "../models/IUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../erros/HttpError.js";
import { StatusCodes } from "http-status-codes";

export class UserService {
    async getAllUsers() {
        return await UserRepository.findAll();
    }

    async getUserById(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid id");
        };

        const user = await UserRepository.findById(id);
        if (!user) {
            throw new HttpError(StatusCodes.NOT_FOUND, "user not found");
        };

        return user;
    }

    async createUser(data: IUser) {
        const { name, email, password } = data;

        const userExists = await UserRepository.findByEmail(email);
        if (userExists) {
            throw new HttpError(StatusCodes.CONFLICT, "Email already registered");
        };

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: passwordHash
        };

        return UserRepository.create(newUser);
    }

    async updateUser(id: string, data: any) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid id");
        };

        const { name, email, password } = data;

        if (!name && !email && !password) {
            throw new HttpError(StatusCodes.BAD_REQUEST, "Data missing or in wrong format");
        };

        const exists = await UserRepository.findById(id);
        if (!exists) {
            throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
        };

        const user: Partial<IUser> = {};

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        return UserRepository.update(id, user);
    }

    async deleteUser(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid id");
        };

        const userExists = await UserRepository.findById(id);
        if (!userExists) {
            throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
        };

        return UserRepository.delete(id);
    }

    async login(credentials: Partial<IUser>) {
        const { email, password } = credentials;
        if (!email || !password) {
            throw new HttpError(StatusCodes.BAD_REQUEST, "Email and passowrd are required");
        }

        const user = await UserRepository.findByEmail(email)
        if (!user) {
            throw new HttpError(StatusCodes.UNAUTHORIZED, "Invalid email or passowrd");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new HttpError(StatusCodes.UNAUTHORIZED, "Invalid email or passowrd");
        }

        const JWT_SECRET = process.env.JWT_SECRET as string;

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        return token
    }
}