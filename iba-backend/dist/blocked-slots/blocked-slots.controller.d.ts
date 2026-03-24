import { BlockedSlotsService, CreateBlockedSlotDto } from './blocked-slots.service';
export declare class BlockedSlotsController {
    private blocked;
    constructor(blocked: BlockedSlotsService);
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
    create(dto: CreateBlockedSlotDto, user: any): Promise<{
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
