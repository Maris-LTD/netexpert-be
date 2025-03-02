import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
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

  @Put(':username')
  updateUser(@Param('username') username: string, @Body() body: { locationId: number }) {
    return this.userService.updateUser(body.locationId, username);
  }
}
