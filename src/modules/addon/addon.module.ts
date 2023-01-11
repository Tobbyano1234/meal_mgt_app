import { Module } from '@nestjs/common';
import { AddonService } from './addon.service';
import { AddonController } from './addon.controller';
import { BrandModule } from '../brand/brand.module';
import { BrandService } from '../brand/brand.service';

@Module({
  // imports:[BrandModule],
  controllers: [AddonController],
  providers: [AddonService, BrandService]
})
export class AddonModule {}
