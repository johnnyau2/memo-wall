import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("memos").del();

    // Inserts seed entries
    await knex("memos").insert([
        { content: "hello sssss", image: "image-1734858830749-2.jpeg" },
        { content: "love coding nice", image: "image-1734864836551-3.jpeg" },
        { content: "1219", image: "image-1734865020470-4.jpeg" }
    ]);

    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { username: "gordon@tecky.io", password: "tecky" },
        { username: "alex@tecky.io", password: "tecky" },
        { username: "123", password: "123" }
    ]);


};
