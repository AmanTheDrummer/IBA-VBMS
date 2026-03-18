import { UsersService, CreateUserDto } from './users.service';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    findAll(): Promise<{
        id: any;
        erp: any;
        name: any;
        email: any;
        role: any;
        created_at: any;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        erp: any;
        name: any;
        email: any;
        role: any;
        created_at: any;
    }>;
    create(dto: CreateUserDto): Promise<{
        id: any;
        erp: any;
        name: any;
        email: any;
        role: any;
        created_at: any;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
