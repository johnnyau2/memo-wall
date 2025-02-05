import express, { NextFunction, query } from "express";
import { Request, Response } from "express";
import expressSession from "express-session";
import path from "path";
import jsonfile from 'jsonfile';
import formidable from 'formidable';
import fs from 'fs';
import { uploadfile } from './uploadfile';
// import { Client } from "pg";
import dotenv from "dotenv";
import * as xlsx from "xlsx";
import Knex from "knex";
import { getAuthRoutes } from "./routes/auth.routes";
import { getMemoRoutes } from "./routes/memo.routes";

dotenv.config();

const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
export const knex = Knex(knexConfig);

// export const client = new Client({
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD
// });

// client.connect();


const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;

let counter = 0;


app.use(
    expressSession({
      secret: "asdfasdf1313r3@#$!#FADFAFw",
      resave: true,
      saveUninitialized: true,
    })
  );
  
declare module "express-session" {
    interface SessionData {
      name?: string;
      view: number;
      user: string;
    }
  }

app.get("/",(req, res) => {
    console.log("test")
    res.redirect("./index.html")
    // next();
});


// app.get("/memo", async (req, res)=>{
//   const data = await knex.select("*").from("memos").orderBy('id', 'asc');
//   res.json(data)
// });


// app.post("/memo", async (req: any, res: Response)=>{
//     const body = await uploadfile(req)
//     console.log(body)
//     const content = body.fields.content
//     console.log(body.files.image)
//     const image = body.files.image ? body.files.image.newFilename : "";
        
//     const memos = await knex("memos").insert({
//       content:content,
//       image:image
//     })
//     res.json({"status":"ok"})
// })

// app.delete("/memo", async (req: Request, res: Response)=>{
//   console.log(req.body.delTargetId )
//   const result = await knex("memos").where("id", req.body.delTargetId).del();
//   res.json({"status":"ok"})
// })

// app.put("/memo/:id", async (req: Request, res: Response)=>{

//   const result = await knex("memos").update({
//     content: req.body.content,
//   })
//   .where("id", req.params.id);
//   res.json({"status":"ok"})
// })


app.use("/index.html",(req: Request, res: Response, next: NextFunction) => {
    if (req.session.view){
        req.session.view++}
        else {
            req.session.view = 1; 
        }
    console.log("counter: ",req.session.view);

    next();
    
  });



app.use((req, res, next) => {
    
    var currentdate = new Date(); 
    var datetime = "["    
                + currentdate.getFullYear() + "-"  
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "]";         
    // console.log(req.path);
    var path = req.path;
      
    //console.log(datetime,"Request",path);
    
    next();
});

app.get("/getcounter", (req: Request, res: Response) => {
    console.log("counter: ",req.session.view)
    res.json({"status":"ok","counter":req.session.view})
});


// app.post("/login", async (req: Request, res:Response)=>{
//   // const users = await jsonfile.readFile(path.resolve("database/users.json"))
//   const users = await knex.select("*").from("users");
//   const clientinput = req.body
//   const array = users.filter(function(elem:{username: string,password: number}){
//     return (elem.username===clientinput.username && elem.password===clientinput.password); 
//   })
//   if(array.length === 0){
//     res.json({"status":"fail","message":"you should login to view."})
//     console.log("login failed after check")
//     return
//   }
//   req.session.user = clientinput.username;
//   res.json({"status":"sucess","message":`hello ${req.session.user}, you have logged in.`})
//   //res.redirect("./admin.html")
//   console.log("login sucess after check")
//   // console.log(req.session.user)
//   //res.json({"status":"ok", users, clientinput, array})
// })

// app.delete("/login", async (req: Request, res:Response)=>{
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Error destroying session:", err);
//       res.json({ "status": "fail", "message": "An error occurred while logging out." });
//       return;
//     }

//     res.json({ "status": "success", "message": "Logout successful." });
//   });
//   // res.json({"status":"ok"})
// })

const isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    //called Next here
    next();
  } else {
    // redirect to index page
    res.status(401).redirect("./index.html")
  }
};



app.use(express.static("public"));
app.use(express.static("uploads"));

app.use("/",getAuthRoutes())
app.use("/",getMemoRoutes())

app.use(isLoggedIn,express.static("protected"));


app.use((req, res) => {
    res.sendFile(path.resolve("./public/404.html"));
});


app.listen(8080, async () => {
  console.log(`Listening at http://localhost:${PORT}/`);

  return
});