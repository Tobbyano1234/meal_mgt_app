import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { v4 as uuid } from "uuid";
import { BrandModel } from './schema/brand.schema';
import { PartialModelObject } from 'objection';
import { ErrorMessages } from 'src/common/constant';


@Injectable()
export class BrandService {
  async createBrand(createBrandDto: CreateBrandDto) {
    const brandId = uuid();
    const { name } = createBrandDto;
    const data = { brandId, name } as PartialModelObject<BrandModel>;
    const brandExist = (await BrandModel.query().findOne({ name }));

    if (brandExist) {
      throw new BadRequestException(ErrorMessages.BRAND_EXIST);
    }
    const brand = (await BrandModel.query().insert(data)).toJSON();

    return { success: true, message: "brand created successfully", data: brand };

  }

  async getBrandById(brandId: string) {
    const brandExist = (await BrandModel.query().findOne({ brandId }));

    if (!brandExist) {
      throw new BadRequestException(ErrorMessages.brandNotFound(brandId))
    };

    return { success: true, message: 'user fetched successfully', data: brandExist };
  }

}
