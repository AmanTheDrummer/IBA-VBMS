import { SupabaseService } from '../supabase/supabase.service';
export declare class CreateBookingDto {
    room_id: string;
    date: string;
    slot_id: number;
    purpose: string;
}
export declare class BookingsService {
    private supabase;
    constructor(supabase: SupabaseService);
    findAll(filters?: {
        status?: string;
        userId?: string;
    }): Promise<{
        id: any;
        date: any;
        slot_id: any;
        purpose: any;
        status: any;
        created_at: any;
        updated_at: any;
        users: {
            id: any;
            erp: any;
            name: any;
            email: any;
        }[];
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
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        date: any;
        slot_id: any;
        purpose: any;
        status: any;
        created_at: any;
        updated_at: any;
        users: {
            id: any;
            erp: any;
            name: any;
            email: any;
        }[];
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
    }>;
    create(userId: string, dto: CreateBookingDto): Promise<{
        id: any;
        date: any;
        slot_id: any;
        purpose: any;
        status: any;
        created_at: any;
        updated_at: any;
        users: {
            id: any;
            erp: any;
            name: any;
            email: any;
        }[];
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
    }>;
    updateStatus(id: string, status: 'approved' | 'rejected', reviewerId: string): Promise<{
        id: any;
        date: any;
        slot_id: any;
        purpose: any;
        status: any;
        created_at: any;
        updated_at: any;
        users: {
            id: any;
            erp: any;
            name: any;
            email: any;
        }[];
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
    }>;
    cancel(id: string, requesterId: string, requesterRole: string): Promise<{
        id: any;
        date: any;
        slot_id: any;
        purpose: any;
        status: any;
        created_at: any;
        updated_at: any;
        users: {
            id: any;
            erp: any;
            name: any;
            email: any;
        }[];
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
    }>;
}
