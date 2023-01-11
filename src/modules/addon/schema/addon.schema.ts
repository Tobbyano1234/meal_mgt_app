import { Model } from "objection";

export class AddonModel extends Model {
    // static tableName = "addons";

    static get tableName() {
        return "addons"
    }


    static get idColumn() {
        return "addonId"
    }

    addonId: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
}
