import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { BrandService } from '../brand/brand.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, BrandService]
})
export class CategoryModule {}
