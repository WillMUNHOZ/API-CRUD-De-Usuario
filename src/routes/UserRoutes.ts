import express from "express";
import { UserController } from "../controllers/UserController";

export const router = express.Router();

router.route("/users")
    .get(UserController.getAll)
    .post(UserController.createUser)

router.route("/users/:id")
    .get(UserController.getUser)
    .post(UserController.updateUser)
    .delete(UserController.deleteUser)