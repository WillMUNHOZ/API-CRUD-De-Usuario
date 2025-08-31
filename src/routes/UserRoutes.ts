import express from "express";
import { UserController } from "../controllers/UserController.js";

export const router = express.Router();

router.route("/users")
    .get(UserController.getAll)
    .post(UserController.createUser)

router.route("/users/:id")
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser)