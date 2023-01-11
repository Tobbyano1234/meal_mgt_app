import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { AddonModule } from './modules/addon/addon.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [DatabaseModule, UserModule, BrandModule, CategoryModule, AddonModule,AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
