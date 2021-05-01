import { UserDTO } from './../../common/dto/user.dto';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getAll() {
    return await this.userRepository.find();
  }

  public async getById(id: string) {
    return await this.userRepository.findOne(id);
  }

  public async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    return user;
  }

  public async getByCpf(cpf: string) {
    return await this.userRepository.find({
      cpf: cpf,
    });
  }

  public async create(data: UserDTO) {
    const user = { ...data };
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(data.password, salt);

    const createdUser = this.userRepository.create(user);
    await this.userRepository.save(user);

    return createdUser;
  }

  public async update(id: string, data: UserDTO) {
    await this.userRepository.update({ id }, data);
  }

  public async delete(id: string) {
    await this.userRepository.delete(id);
  }
}
