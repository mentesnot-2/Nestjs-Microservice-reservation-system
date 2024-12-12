import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    JwtModule.registerAsync({
      useFactory: (configService:ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn:`${configService.get('JWT_EXPIRATION_TIME')}s`
        }
      }),
      inject:[ConfigService] 
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'./apps/auth/.env',
      validationSchema: Joi.object({
        MONGO_DB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
        PORT: Joi.number().required(),
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
})
export class AuthModule {}
