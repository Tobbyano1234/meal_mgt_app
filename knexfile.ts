// import { knex, Knex } from "knex";
// import { Model } from "objection"
// import * as dotenv from "dotenv";
// dotenv.config();


// // Update with your config settings.

// const config: { [key: string]: Knex.Config } = {
//   development: {
//     client: "pg",
//     useNullAsDefault: true,
//     connection:
//     // process.env.DATABASE_URL
//     {
//       host: process.env.POSTGRES_HOST,
//       port: Number(process.env.POSTGRES_PORT),
//       user: process.env.POSTGRES_USER,
//       password: process.env.POSTGRES_PASSWORD,
//       database: process.env.POSTGRES_DB,
//     }
//   },

// };

// const ENV = process.env.NODE_ENV !== "test" ? "development" : "test";

// console.log(config[ENV])
// const dbConfig = knex(config[ENV]);

// Model.bindKnex(dbConfig)
// export default Model.bindKnex(dbConfig)


const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: "pg",
  useNullAsDefault: true,
  connection: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  }
});
const dbConfig = knex(knex);

// // Give the knex instance to objection.
// export default Model.knex(knex);