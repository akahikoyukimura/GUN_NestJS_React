import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string,rememberMe:boolean) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.pass);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
      
    }

        if (!user.isActive) {
      throw new UnauthorizedException(
        'Your account is inactive',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };


    // Access token is always short-lived
    const accessToken =
      await this.jwtService.signAsync(payload);

    // Refresh token depends on Remember Me
    const refreshToken =
      await this.jwtService.signAsync(payload, {
        expiresIn: rememberMe ? '1d' : '15m',
      });



    return {
            access_token: accessToken,
      refresh_token: refreshToken, // this reurn tocken in resp obj
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        failedLoginAttempts: user.failedLoginAttempts,
        lockedUntil: user.lockedUntil,
      },
    }; // {access_token:...., user:{id....}}
  }


  async refresh(refreshToken: string) {
    try {
      const payload =
        await this.jwtService.verifyAsync(refreshToken);

      const newPayload = {
        sub: payload.sub,
        email: payload.email,
      };

      const accessToken =
        await this.jwtService.signAsync(newPayload);

      return {
        access_token: accessToken,
      };
    } catch {
      throw new UnauthorizedException(
        'Refresh token is invalid or expired',
      );
    }
  }
}
