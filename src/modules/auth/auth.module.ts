import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './guards/jwt-strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserModel } from '../user/schema/user.schema';
import { forwardRef, Module } from '@nestjs/common';


@Module({
    imports: [forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '1h' }
    }),
    ObjectionModule.forFeature([UserModel])],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }


