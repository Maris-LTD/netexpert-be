import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() body: { username: string; email: string; password: string }) {
    return this.userService.createUser(body.username, body.email, body.password);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.userService.getUser(username);
  }
}
