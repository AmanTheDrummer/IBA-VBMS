import { SupabaseService } from '../supabase/supabase.service';
export declare class TimeSlotsService {
    private supabase;
    constructor(supabase: SupabaseService);
    findAll(): Promise<any[]>;
}
export declare class TimeSlotsController {
    private ts;
    constructor(ts: TimeSlotsService);
    findAll(): Promise<any[]>;
}
export declare class TimeSlotsModule {
}
