import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  // [TODO] fix error handling 
  // [TODO] add validation
  async createUser(username: string, email: string, password: string) { 
    const existingUser = await this.userRepository.findOne({ where: { username } });
    const existingEmail = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    if (existingEmail) {
      throw new Error('Email already exists');
    }

    const user = this.userRepository.create({ username, email, password });
    return this.userRepository.save(user);
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async getUser(username: string) {
    return this.userRepository.findOne({ where: { username }, relations: ['location'] });
  }

  async updateUser(locationId: number, username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    user.locationId = locationId;
    return this.userRepository.save(user);
  }
}
