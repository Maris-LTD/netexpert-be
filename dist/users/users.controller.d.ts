import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(body: {
        username: string;
        email: string;
        password: string;
    }): Promise<import("./user.entity").User>;
    getUsers(): Promise<import("./user.entity").User[]>;
    getUser(username: string): Promise<import("./user.entity").User | null>;
}
