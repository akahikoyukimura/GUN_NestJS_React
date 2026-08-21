import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';
import type { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // readonly to no assign the auth value

  @Post('register')
  @Public()
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const createUserDto: CreateUserDto = {
      name: registerDto.name,
      email: registerDto.email,
      pass: registerDto.pass,
      role: UserRole.USER,
    };

    await this.authService.register(createUserDto);
    return {
      message: 'Registration successful',
    };
  }

  @Post('login')
  @Public()
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(
      loginDto.email,
      loginDto.pass,
      loginDto.rememberMe,
    );

    response.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: false, // true in HTTPS production
      sameSite: 'lax',

      maxAge: loginDto.rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined,
    });

    return {
      access_token: result.access_token,

      user: result.user,
    };
  }

  @Post('refresh')
  async refresh(@Req() request: any) {
    const refreshToken = request.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');

    return {
      message: 'Logged out successfully',
    };
  }

  //   @UseGuards(JwtAuthGuard)  // GET /home without token gives 401 (to prevent access path without login)
  //   @Get('path')
  //   getHome(@Request() req) {
  //     return {
  //       message: 'Welcome to home',
  //       user: req.user,
  //     };
  //   }
}
