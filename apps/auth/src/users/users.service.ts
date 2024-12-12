import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        });
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({email});
        if (!user) {
            throw new Error('User not found');
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new Error('Invalid password');
        }
        return user;
    }
}
