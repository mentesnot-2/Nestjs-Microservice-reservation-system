import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService:ConfigService,
    private readonly jwtService: JwtService
  ){}

  async login(user:UserDocument, response:Response){

    const tokenPayload = {
      userId: user._id.toHexString(),
    }
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPIRATION_TIME'))
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication',token,{
      expires,
      httpOnly:true,
      // secure:process.env.NODE_ENV === 'production',
      // sameSite:'strict'
    })
  }

}
