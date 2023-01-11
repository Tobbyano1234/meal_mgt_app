import { Knex } from "knex";

exports.up = async (db: Knex): Promise<void> => {
    return await db.schema.createTable("users", function (table) {
        table.uuid("userId").primary();
        table.string("fullName", 255).notNullable();
        table.string("email").index().unique().notNullable();
        table.string("password").notNullable();
        table.boolean("isAdmin").defaultTo(false);
        table.timestamp("createdAt").defaultTo(db.fn.now());
        table.timestamp("updatedAt").defaultTo(db.fn.now());
    });
};

exports.down = async (db: Knex): Promise<void> => {
    return await db.schema.dropTable("users");
};