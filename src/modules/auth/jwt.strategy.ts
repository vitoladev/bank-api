import { ExtractJwt, Strategy, JwtPayload } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { InvalidCredentialsException } from 'src/core/http/exceptions/invadid-credentials-exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ iat, exp, id }: JwtPayload, done) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new InvalidCredentialsException();
    }

    const user = await this.usersService.getById(id);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    delete user.password;
    done(null, user);
  }
}
