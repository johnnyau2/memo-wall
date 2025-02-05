import express, {Request, Response} from "express";
import { knex } from "../main";
import { AuthService } from "../services/auth.service";

export class AuthController {

    constructor(protected authService: AuthService){

    }

    login = async (req: Request, res:Response) => {

        // const users = await knex.select("*").from("users");
        const users = await this.authService.getUsers();
        const clientinput = req.body
        const array = users.filter(function(elem:{username: string,password: number}){
        return (elem.username===clientinput.username && elem.password===clientinput.password); 
        })
        if(array.length === 0){
        res.json({"status":"fail","message":"you should login to view."})
        console.log("login failed after check")
        return
        }
        req.session.user = clientinput.username;
        res.json({"status":"sucess","message":`hello ${req.session.user}, you have logged in.`})
        console.log("login sucess after check")


    }

    logout = async (req: Request, res:Response)=>{
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
            res.json({ "status": "fail", "message": "An error occurred while logging out." });
            return;
          }
      
          res.json({ "status": "success", "message": "Logout successful." });
        });

    }




}