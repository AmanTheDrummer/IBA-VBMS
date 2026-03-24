import { SupabaseService } from '../supabase/supabase.service';
export declare class CreateBlockedSlotDto {
    room_id: string;
    date: string;
    slot_ids: number[];
    reason?: string;
}
export declare class BlockedSlotsService {
    private supabase;
    constructor(supabase: SupabaseService);
    findAll(roomId?: string, date?: string): Promise<{
        id: any;
        date: any;
        slot_id: any;
        reason: any;
        created_at: any;
        rooms: {
            id: any;
            name: any;
            buildings: {
                id: any;
                name: any;
            }[];
        }[];
        time_slots: {
            id: any;
            start_time: any;
            end_time: any;
            label: any;
        }[];
        users: {
            id: any;
            name: any;
        }[];
    }[]>;
    create(adminId: string, dto: CreateBlockedSlotDto): Promise<{
        id: any;
        date: any;
        slot_id: any;
        reason: any;
        created_at: any;
        rooms: {
            id: any;
            name: any;
            buildings: {
                id: any;
                name: any;
            }[];
        }[];
        time_slots: {
            id: any;
            start_time: any;
            end_time: any;
            label: any;
        }[];
        users: {
            id: any;
            name: any;
        }[];
    }[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
