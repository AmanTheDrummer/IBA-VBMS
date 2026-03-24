import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(cfg: ConfigService);
    validate(payload: {
        sub: string;
        erp: string;
        role: string;
    }): Promise<{
        id: string;
        erp: string;
        role: string;
    }>;
}
export {};
