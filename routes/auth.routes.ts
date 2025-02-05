import express from "express";
import { knex } from "../main";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

export const getAuthRoutes = () => {

    const authRoutes = express.Router();

    const authService = new AuthService(knex);
    const authController = new AuthController(authService);

    authRoutes.post("/login", authController.login);
    authRoutes.delete("/login", authController.logout);

    return authRoutes;

}