import express from "express";
import { UserController } from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const router = express.Router();

router.post("/auth/register", UserController.register)
router.post("/auth/login", UserController.login)

router.get("/users", authMiddleware, UserController.getAll)

router.route("/users/:id")
    .get(authMiddleware, UserController.getUser)
    .put(authMiddleware, UserController.updateUser)
    .delete(authMiddleware, UserController.deleteUser)