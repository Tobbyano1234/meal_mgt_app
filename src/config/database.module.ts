// import { ConfigModule } from '@nestjs/config';
// import { ObjectionModule } from "@willsoto/nestjs-objection";
// import { Module } from "@nestjs/common";
// import { UserModel } from "../modules/user/schema/user.schema";
// import { BrandModel } from 'src/modules/brand/schema/brand.schema';
// import { AddonModel } from 'src/modules/addon/schema/addon.schema';
// import { CategoryModel } from 'src/modules/category/schema/category.schema';


// @Module({
//     imports: [
//         ConfigModule.forRoot({
//             isGlobal: true,
//         }),
//         ObjectionModule.register({
//             // You can specify a custom BaseModel
//             // If none is provided, the default Model will be used
//             // https://vincit.github.io/objection.js/#models
//             // Model: BaseModel,
//             config: {
//                 client: process.env.DB_TYPE,
//                 useNullAsDefault: true,
//                 connection: {
//                     host: process.env.POSTGRES_HOST,
//                     port: Number(process.env.POSTGRES_PORT),
//                     user: process.env.POSTGRES_USER,
//                     password: process.env.POSTGRES_PASSWORD,
//                     database: process.env.POSTGRES_DB,
//                 },
//             },
//         }),

//         //Register your objection models so it can be provided when needed.
//         ObjectionModule.forFeature([UserModel, BrandModel, AddonModel, CategoryModel]),
//     ],
//     exports: [ObjectionModule],
// })
// export class DatabaseModule { }


import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { UserModel } from "../modules/user/schema/user.schema";
import { BrandModel } from 'src/modules/brand/schema/brand.schema';
import { AddonModel } from 'src/modules/addon/schema/addon.schema';
import { CategoryModel } from 'src/modules/category/schema/category.schema';

const models = [UserModel, BrandModel, AddonModel, CategoryModel];

const modelProviders = models.map(model => {
    return {
        provide: model.name,
        useValue: model
    };
});

const providers = [
    ...modelProviders,
    {

        provide: 'KnexConnection',
        useFactory: async () => {
            const knex = Knex.knex({
                client: 'pg',
                connection:
                // process.env.DATABASE_URL
                {
                    host: process.env.POSTGRES_HOST,
                    port: Number(process.env.POSTGRES_PORT),
                    user: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                    database: process.env.POSTGRES_DB,
                },
                debug: process.env.KNEX_DEBUG === 'true',
                // ...knexSnakeCaseMappers()
            });

            Model.knex(knex);
            return knex;
        }
    }
];

@Global()
@Module({
    providers: [...providers],
    exports: [...providers]
})
export class DatabaseModule { }