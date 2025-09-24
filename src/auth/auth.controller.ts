import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UserRole } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { Public } from './decorators/public.decorator';
import { User } from '@prisma/client';
import type { Request } from 'express';

type SanitizedUser = Omit<User, 'passwordHash'>;

type RequestWithUser = Request & {
  user: User;
};

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @SkipThrottle({ default: false })
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ access_token: string; user: SanitizedUser }> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Email already exists' })
  async register(@Body() registerDto: RegisterDto): Promise<SanitizedUser> {
    const user = await this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.role || UserRole.VIEWER,
    );

    const { passwordHash: _passwordHash, ...result } = user;
    void _passwordHash;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  getProfile(@Req() req: RequestWithUser): SanitizedUser {
    const { passwordHash: _passwordHash, ...user } = req.user;
    void _passwordHash;
    return user;
  }
}
