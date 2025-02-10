import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':username')
  @UseGuards(AuthGuard)
  async findOne(@Param('username') username: string) {
    console.log(username);
    return this.usersService.findOne(username);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }
}
