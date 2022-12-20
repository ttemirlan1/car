import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private auth: JwtService ) {}
    async login(dto: LoginDto) {
        if (
          dto.login === process.env.LOGIN &&
          dto.password === process.env.PASSWORD
        ) {
          const payload = { access: true };
          return {
            token: await this.auth.signAsync(payload),
          };
        }
        throw new BadRequestException();
      }
}
