import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';


@Controller('brands')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(JwtAuthGuard)
  @Post("/:brandId/addon-categories")
  create(@Param("brandId") brandId: string, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(brandId, createCategoryDto);
  }

}
