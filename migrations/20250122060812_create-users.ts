import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('users',table=>{

        table.increments()
        table.string('username')
        table.string('password')
        table.timestamps(false,true)

    })

}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('users')

}

