import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(username: string, pass: string): Promise<any>;
    signUp(username: string, email: string, password: string): Promise<User>;
    getLoggedInUser(): Promise<User[]>;
}
