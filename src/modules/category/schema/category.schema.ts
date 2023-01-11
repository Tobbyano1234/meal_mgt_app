import { Model, RelationMappings, RelationMappingsThunk, RelationType } from "objection";
import { BrandModel } from "src/modules/brand/schema/brand.schema";

export class CategoryModel extends Model {
    // static tableName = "addon_category"

    static get tableName() {
        return "addon_category"
    }

    static get idColumn() {
        return "categoryId"
    }

    name: string;
    brandId: string;

}
