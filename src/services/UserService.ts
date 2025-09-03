import mongoose from "mongoose";
import { UserRepository } from "../repositories/UserRepository.js"
import { IUser } from "../models/IUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    async getAllUsers() {
        return await UserRepository.findAll();
    }

    async getUserById(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid Id");
        };

        const user = await UserRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        };

        return user;
    }

    async createUser(data: IUser) {
        const { name, email, password } = data;

        const userExists = await UserRepository.findByEmail(email);
        if (userExists) {
            throw new Error("Email already registered")
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
            throw new Error("Invalid Id");
        };

        const { name, email, password } = data;

        if (!name && !email && !password) {
            throw new Error("At least one field must be sent");
        };

        const exists = await UserRepository.findById(id);
        if (!exists) {
            throw new Error("User not found");
        };

        const user: Partial<IUser> = {};

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        return UserRepository.update(id, user);
    }

    async deleteUser(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid Id");
        };

        const userExists = await UserRepository.findById(id);
        if (!userExists) {
            throw new Error("User not found");
        };

        return UserRepository.delete(id);
    }

    async login(credentials: Partial<IUser>) {
        const { email, password } = credentials;
        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        const user = await UserRepository.findByEmail(email)
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Invalid email or password");
        }

        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is required");
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        return token
    }
}