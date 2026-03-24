import { SupabaseService } from '../supabase/supabase.service';
export declare class CreateRoomDto {
    building_id: string;
    name: string;
    capacity: number;
    type: string;
}
export declare class RoomsService {
    private supabase;
    constructor(supabase: SupabaseService);
    findAll(buildingId?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    getAvailability(roomId: string, date: string): Promise<{
        bookedSlots: {
            slot_id: any;
            status: any;
        }[];
        blockedSlots: {
            slot_id: any;
            reason: any;
        }[];
    }>;
    create(dto: CreateRoomDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
