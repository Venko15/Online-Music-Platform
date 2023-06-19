import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from 'src/schemas/user.schema';


@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[]
  
})
export class UsersModule {}
