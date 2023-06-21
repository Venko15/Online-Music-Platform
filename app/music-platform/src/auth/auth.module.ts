import { Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/services/users/users.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { StrategyJwtAT } from './strategies/jwtAt.strategy';
import { StrategyJwtRT } from './strategies/jwtRt.strategy';

import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [UsersModule,    
    JwtModule.register({
    global: true,
    signOptions: { expiresIn: '5m' },
  }),
  TypeOrmModule.forFeature([User]),
],
  controllers: [AuthController],
  providers: [AuthService, StrategyJwtAT, StrategyJwtRT],
 
})
export class AuthModule {}
