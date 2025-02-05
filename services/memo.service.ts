import { Knex } from "knex";

export class MemoService {
    constructor(protected knex: Knex) {}

    getMemo = async () => {

        const data = await this.knex.select("*").from("memos").orderBy('id', 'asc');
        return data;

    }

    newMemo = async (content: any,image: any) =>{

        const memos = await this.knex("memos").insert({
            content:content,
            image:image
        })

        return memos;

    }

    delMemo = async (id: any)=>{
        const result = await this.knex("memos").where("id", id).del();
        return result;
    }

    upMemo = async (content: any, id: any)=>{
        const result = await this.knex("memos").update({
            content: content,
          })
          .where("id", id);
    }

}