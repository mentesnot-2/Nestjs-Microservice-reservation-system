import { Controller, Get, UseGuards } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './models/users.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Post()
    async Create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(
        @CurrentUser() user: UserDocument
    ) {
        return user;
    }
}
