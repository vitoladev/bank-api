import { UserDTO } from './../../common/dto/user.dto';
import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { LoginDTO } from 'src/common/dto/login.dto';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() payload: LoginDTO) {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post('register')
  async register(@Body() payload: UserDTO) {
    const user = await this.userService.create(payload);
    return await this.authService.createToken(user);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async getLoggedInUser(@Request() request): Promise<User> {
    return request.user;
  }
}
