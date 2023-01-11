import { Knex } from "knex";

exports.up = async (db: Knex): Promise<void> => {
    return await db.schema.createTable("addon_category", function (table) {
        table.uuid("categoryId").primary();
        table
            .uuid("brandId")
            .references("brandId")
            .inTable("brands")
            .index();
        table.string("name", 255).notNullable();
        table.timestamp("createdAt").defaultTo(db.fn.now());
        table.timestamp("updatedAt").defaultTo(db.fn.now());
    });
};

exports.down = async (db: Knex): Promise<void> => {
    return await db.schema.dropTable("addon_category");
};