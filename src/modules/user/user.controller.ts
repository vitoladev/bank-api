import { NestResponseBuilder } from './../../core/http/nest-response-builder';
import { UserDTO } from './../../common/dto/user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  public async createUser(@Body() data: UserDTO) {
    const user = await this.userService.create(data);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/users/${user.id}`,
      })
      .withBody(user)
      .build();
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() user: UserDTO) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
