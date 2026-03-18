import { SupabaseService } from '../supabase/supabase.service';
export declare class CreateBuildingDto {
    name: string;
    location?: string;
}
export declare class BuildingsService {
    private supabase;
    constructor(supabase: SupabaseService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(dto: CreateBuildingDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
