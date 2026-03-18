import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
export declare class AuthService {
    private supabase;
    private jwt;
    constructor(supabase: SupabaseService, jwt: JwtService);
    login(erp: string, password: string): Promise<{
        access_token: string;
        user: {
            id: any;
            erp: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
    hashPassword(plain: string): Promise<string>;
}
