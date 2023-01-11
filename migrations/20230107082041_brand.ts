import { Knex } from "knex";

exports.up = async (db: Knex): Promise<void> => {
    return await db.schema.createTable("brands", function (table) {
        table.uuid("brandId").primary();
        table.string("name").index().unique().notNullable();
        table.timestamp("createdAt").defaultTo(db.fn.now());
        table.timestamp("updatedAt").defaultTo(db.fn.now());
    });
};

exports.down = async (db: Knex): Promise<void> => {
    return await db.schema.dropTable("brands");
};