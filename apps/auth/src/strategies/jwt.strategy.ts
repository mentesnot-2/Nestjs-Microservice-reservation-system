import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService:ConfigService,
        private readonly usersService:UsersService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([(request:any) => request?.cookies?.Authentication || request?.Authentication]),
            secretOrKey:configService.get('JWT_SECRET')
        })
    }

    async validate({userId}:TokenPayload) {
        return this.usersService.getUser({_id:userId});
    }
}