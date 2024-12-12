import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";


export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService:ConfigService,
        private readonly usersService:UsersService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => request?.cookies?.Authentication]),
            secretOrKey:configService.get('JWT_SECRET')
        })
    }
}