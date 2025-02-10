import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        if (!user) {
            throw new NotFoundException();
        }
        if (user.password !== pass) {
            throw new UnauthorizedException();
        }
        return this.jwtService.signAsync({
            username: user.username,
            password: user.password,
            userId: user.id
        }, { secret: jwtConstants.secret });
    }

    async signUp(username: string, email: string, password: string) {
        return this.usersService.createUser(username, email, password);
    }
}
