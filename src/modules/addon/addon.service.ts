import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { v4 as uuid } from "uuid";
import { PartialModelObject } from 'objection';
import { AddonModel } from './schema/addon.schema';
import { ErrorMessages } from 'src/common/constant';
import { BrandModel } from '../brand/schema/brand.schema';
import { BrandService } from '../brand/brand.service';


@Injectable()
export class AddonService {
  constructor(private readonly brandService: BrandService) { }

  async createAddon(createAddonDto: CreateAddonDto, brandId: string) {
    const addonId = uuid();
    const { name, description, price, category } = createAddonDto;
    const data = { addonId, brandId, name, description, price, category } as PartialModelObject<AddonModel>;

    const brandExist = await this.brandService.getBrandById(brandId);

    if (!brandExist) {
      throw new BadRequestException(ErrorMessages.brandNotFound(brandId))
    }

    const addonExist = await AddonModel.query().findOne({ name });
    if (addonExist) {
      throw new BadRequestException(ErrorMessages.ADDON_EXIST)
    }

    const addon = (await AddonModel.query().insert(data)).toJSON();

    return { success: true, message: 'addon created successfully', data: addon };

  }

  async getAllAddons(brandId: string) {

    const brandExist = await this.brandService.getBrandById(brandId);

    if (!brandExist) {
      throw new BadRequestException(ErrorMessages.brandNotFound(brandId))
    };

    const addons = await AddonModel.query();
    return { success: true, message: 'addons fetched successfully', data: addons };

  }

  async getAddonById(brandId: string, addonId: string) {
    const brandExist = await this.brandService.getBrandById(brandId);

    if (!brandExist) {
      throw new BadRequestException(ErrorMessages.brandNotFound(brandId))
    };

    const addon = (await AddonModel.query().findOne({ addonId }));

    if (!addon) {
      throw new BadRequestException(ErrorMessages.addonNotFound(addonId))
    }

    return { success: true, message: 'addon fetched successfully', data: addon };

  }

  async updateAddon(brandId: string, addonId: string, updateAddonDto: UpdateAddonDto) {

    const brandExist = await this.brandService.getBrandById(brandId);

    if (!brandExist) {
      throw new BadRequestException(ErrorMessages.brandNotFound(brandId))
    };

    const addon = (await AddonModel.query().patchAndFetchById(addonId, updateAddonDto));

    if (!addon) {
      throw new BadRequestException(ErrorMessages.addonNotFound(addonId))
    }
    return { success: true, message: 'addon updated successfully', data: addon };
  }

  async deleteAddon(brandId: string, addonId: string,) {

    const brandExist = await this.brandService.getBrandById(brandId);

    if (!brandExist) {
      throw new BadRequestException(ErrorMessages.brandNotFound(brandId))
    };

    const addon = await AddonModel.query().deleteById(addonId)

    if (!addon) {
      throw new BadRequestException(ErrorMessages.addonNotFound(addonId))
    }

    return { success: true, message: 'addon deleted successfully', data: {} };

  }
}
