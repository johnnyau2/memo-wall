import express from "express";
import { Request, Response } from "express";
import { knex } from "../main";
import { uploadfile } from "../uploadfile";
import { MemoController } from "../controllers/memo.controller";
import { MemoService } from "../services/memo.service";

export const getMemoRoutes = () => {

    const memoRoutes = express.Router();

    // const authService = new AuthService(knex);
    // const authController = new AuthController(authService);

    // authRoutes.post("/login", authController.login);
    // authRoutes.delete("/login", authController.logout);

    const memoService = new MemoService(knex);
    const memoController = new MemoController(memoService);

    memoRoutes.get("/memo", memoController.getMemo);
      
    memoRoutes.post("/memo", memoController.newMemo);
      
    memoRoutes.delete("/memo", memoController.delMemo);
      
    memoRoutes.put("/memo/:id", memoController.upMemo);
      



    return memoRoutes;

}