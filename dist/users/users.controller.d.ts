import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findOne(username: string): Promise<any>;
    findAll(): Promise<any[]>;
}
