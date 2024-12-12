import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from './models/users.schema';
import { UsersRepository } from './users.repository';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports:[
    DatabaseModule,
    DatabaseModule.forFeature([{name:UserDocument.name, schema:UserSchema}]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
  exports:[UsersService]
})
export class UsersModule {}
