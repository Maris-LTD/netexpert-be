import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(username: string, email: string, password: string): Promise<User>;
    getUsers(): Promise<User[]>;
    getUser(username: string): Promise<User | null>;
    updateUser(locationId: number, username: string): Promise<User>;
}
