import mongoose from "mongoose";
import { UserRepository } from "../repositories/UserRepository"
import { IUser } from "../models/IUser";
import bcrypt from "bcrypt";

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
    };
}