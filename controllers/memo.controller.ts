import express from "express";
import { Request, Response } from "express";
import { knex } from "../main";
import { uploadfile } from "../uploadfile";
import { MemoService } from "../services/memo.service";


export class MemoController {

    constructor(protected memoService: MemoService){

    }

    getMemo = async (req: Request, res: Response)=>{
        const data = await this.memoService.getMemo();
        res.json(data)
      }

    newMemo = async (req: any, res: Response)=>{
        const body = await uploadfile(req)
        console.log(body)
        const content = body.fields.content
        console.log(body.files.image)
        const image = body.files.image ? body.files.image.newFilename : "";
            
        const memos = await this.memoService.newMemo(content, image)
        res.json({"status":"ok",memos})
    }

    delMemo = async (req: Request, res: Response)=>{
        console.log(req.body.delTargetId )
        // const result = await knex("memos").where("id", req.body.delTargetId).del();
        const result = await this.memoService.delMemo(req.body.delTargetId)
        res.json({"status":"ok"})
      }

    upMemo = async (req: Request, res: Response)=>{
      
        const result = await this.memoService.upMemo(req.body.content,req.params.id);
        res.json({"status":"ok"})
      }

}