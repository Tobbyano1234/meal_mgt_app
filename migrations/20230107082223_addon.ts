import { Knex } from "knex";

exports.up = async (db: Knex): Promise<void> => {
    return await db.schema.createTable("addons", function (table) {
        table.uuid("addonId").primary();
        table
            .uuid("brandId")
            .references("brandId")
            .inTable("brands")
            .index()
            .notNullable();
        table.string("name").notNullable();
        table.string("description").nullable();
        table.integer("price").notNullable();
        table.string("category").index().nullable();
        table.timestamp("createdAt").defaultTo(db.fn.now());
        table.timestamp("updatedAt").defaultTo(db.fn.now());
    });
};

exports.down = async (db: Knex): Promise<void> => {
    return await db.schema.dropTable("addons");
};