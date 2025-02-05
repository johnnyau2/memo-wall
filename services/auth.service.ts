import { Knex } from "knex";

export class AuthService {
    constructor(protected knex: Knex) {}

    getUsers = async () => {
        if (!this.knex) {
            throw new Error('Knex instance is not initialized');
        }

        const users = await this.knex.select("*").from("users");
        return users;
    }
}