// // import { registerAs } from '@nestjs/config';
// // import { basePath } from '@app/core';

// // export default registerAs('db', () => ({
// //     type: process.env.DB_TYPE || 'mysql2',
// //     host: process.env.DB_HOST || 'localhost',
// //     port: process.env.DB_PORT || 3306,
// //     username: process.env.DB_USER || 'root',
// //     password: process.env.DB_PASSWORD || 'root',
// //     database: process.env.DB_DATABASE || 'test',
// // }));


// import { Client } from "pg";
// const client = new Client();
// const dbName = "meal_app"
// const createDBFunction = async () => {
//     try {
//         await client.connect();
//         await client.query(`CREATE DATABASE ${dbName}`);
//         console.log("db connected")
//         await client.end();
//     } catch (error) {
//         console.error(error)
//     }
// }

// export default createDBFunction;