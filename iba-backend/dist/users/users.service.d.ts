import { SupabaseService } from '../supabase/supabase.service';
import { AuthService } from '../auth/auth.service';
export declare class CreateUserDto {
    erp: string;
    name: string;
    email: string;
    password: string;
    role: string;
}
export declare class UsersService {
    private supabase;
    private authService;
    constructor(supabase: SupabaseService, authService: AuthService);
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
