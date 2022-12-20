import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { config } from 'dotenv';
  config();
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(private auth: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization'];
      const payload: any = this.auth.decode(token?.split(' ')[1]);
      const verified = await this.verifyToken(token?.split(' ')[1]);
      if (!verified) throw new BadRequestException();
      if (payload === null) throw new UnauthorizedException();
      if (payload.access) {
        return true;
      }
      throw new UnauthorizedException();
    }
    private async verifyToken(token: string) {
      return await this.auth.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    }
  }