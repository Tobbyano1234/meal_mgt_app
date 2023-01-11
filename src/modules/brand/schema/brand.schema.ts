import { Model, RelationMappings, RelationMappingsThunk } from "objection";
import { AddonModel } from "src/modules/addon/schema/addon.schema";
import { CategoryModel } from "src/modules/category/schema/category.schema";

export class BrandModel extends Model {
    // static tableName = "brands"

    static get tableName() {
        return "brands"
    }

    static get idColumn() {
        return "brandId"
    }

    name: string;

    addon: AddonModel[];
    category: CategoryModel[];

    static get relationMappings(): RelationMappings | RelationMappingsThunk {
        return {
            addon: {
                relation: Model.HasManyRelation,
                modelClass: AddonModel,
                join: {
                    from: "brand.brandId",
                    to: "addons.addonId"
                }
            },
            category: {
                relation: Model.HasManyRelation,
                modelClass: CategoryModel,
                join: {
                    from: "brand.brandId",
                    to: "category.categoryId"
                }
            }
        }
    };
}
