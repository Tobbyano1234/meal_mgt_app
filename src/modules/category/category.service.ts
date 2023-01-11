import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 as uuid } from "uuid";
import { BrandService } from '../brand/brand.service';
import { ErrorMessages } from 'src/common/constant';
import { CategoryModel } from './schema/category.schema';


@Injectable()
export class CategoryService {
  constructor(private readonly brandService: BrandService) { }


  async createCategory(brandId: string, createCategoryDto: CreateCategoryDto) {

    const categoryId = uuid();
    const { name } = createCategoryDto;
    const data = { categoryId, brandId, name, } as CreateCategoryDto;

    const brandExist = await this.brandService.getBrandById(brandId);

    if (!brandExist) {
      throw new BadRequestException(ErrorMessages.brandNotFound(brandId))
    }

    const categoryExist = await CategoryModel.query().findOne({ name });
    if (categoryExist) {
      throw new BadRequestException(ErrorMessages.CATEGORY_EXIST)
    }

    const category = (await CategoryModel.query().insert(data)).toJSON();

    return { success: true, message: 'category created successfully', data: category };
  }

}
