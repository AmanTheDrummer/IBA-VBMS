import { AuthService } from './auth.service';
declare class LoginDto {
    erp: string;
    password: string;
}
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            erp: any;
            name: any;
            email: any;
            role: any;
        };
    }>;
}
export {};
