import { RoomsService, CreateRoomDto } from './rooms.service';
export declare class RoomsController {
    private rooms;
    constructor(rooms: RoomsService);
    findAll(buildingId?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    availability(id: string, date: string): Promise<{
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
