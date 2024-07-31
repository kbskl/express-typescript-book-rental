import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('rentals', function(table) {
        table.increments();
        table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('bookId').notNullable().references('id').inTable('books').onDelete('CASCADE').onUpdate('CASCADE');
        table.dateTime('rentalDate').notNullable();
        table.dateTime('returnDate');
        table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
        table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('rentals');
}
