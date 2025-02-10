import { Injectable } from '@nestjs/common';

// [TODO] - Replace with database

@Injectable()
export class UsersService {
    private readonly users = [
        {userId: 1, username: 'john', password: 'changeme'},
        {userId: 2, username: 'chris', password: 'secret'},
        {userId: 3, username: 'maria', password: 'guess'},
    ];

    async findOne(username: string): Promise<any | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findAll(): Promise<any[]> {
        return this.users;
    }
}
