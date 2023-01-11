import { Model } from "objection";


export class UserModel extends Model {

    // static tableName = "users"

    static get tableName() {
        return "users"
    }

    static get idColumn() {
        return "userId"
    };
    userId: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}