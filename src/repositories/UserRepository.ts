import { User } from "../models/User.js"
import { IUser } from "../models/IUser.js";


export const UserRepository = {
    async findAll() {
        return await User.find().select("-password");
    },

    async findById(id: string) {
        return await User.findById(id).select("-password");
    },

    async findByEmail(email: string) {
        return await User.findOne({ email }).select("-password");
    },

    async create(data: IUser) {
        const newUser = new User(data);
        await newUser.save();
        const user = User.findById(newUser._id).select("-password");
        return user;
    },

    async update(id: string, data: Partial<IUser>) {
        return await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
    },

    async delete(id: string) {
        return await User.findByIdAndDelete(id).select("-password");
    },
};