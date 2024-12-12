import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}
    @Post()
    async Create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }
}
