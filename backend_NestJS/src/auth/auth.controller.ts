import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // readonly to no assign the auth value

  @Post('login')
  @Public()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.pass);
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
