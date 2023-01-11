import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';

@Controller('brands')
export class AddonController {
  constructor(private readonly addonService: AddonService) { }

  @UseGuards(JwtAuthGuard)
  @Post("/:brandId/addons")
  create(@Param("brandId") brandId: string, @Body() createAddonDto: CreateAddonDto) {
    return this.addonService.createAddon(createAddonDto, brandId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:brandId/addons")
  getAllAddons(@Param("brandId") brandId: string) {
    return this.addonService.getAllAddons(brandId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:brandId/addons/:addonId")
  getAddonById(@Param("brandId") brandId: string, @Param("addonId") addonId: string) {
    return this.addonService.getAddonById(brandId, addonId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/:brandId/addons/:addonId")
  updateAddon(@Param("brandId") brandId: string, @Param("addonId") addonId: string, @Body() updateAddonDto: UpdateAddonDto) {
    return this.addonService.updateAddon(brandId, addonId, updateAddonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:brandId/addons/:addonId")
  deleteAddon(@Param("brandId") brandId: string, @Param("addonId") addonId: string) {
    return this.addonService.deleteAddon(brandId, addonId);
  }
}
