import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'src/utils/jwt_config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule.register(JWT_CONFIG)],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
