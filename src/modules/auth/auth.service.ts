import { UserService } from './../user/user.service';
import { LoginDTO } from './../../common/dto/login.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { InvalidCredentialsException } from 'src/core/http/exceptions/invadid-credentials-exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }

  async validateUser(payload: LoginDTO): Promise<User> {
    const user = await this.userService.getByEmail(payload.email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isValid = await bcrypt.compare(payload.password, user.password);

    if (!isValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }
}
