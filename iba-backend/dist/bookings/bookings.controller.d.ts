import { BookingsService, CreateBookingDto } from './bookings.service';
export declare class BookingsController {
    private bookings;
    constructor(bookings: BookingsService);
    findAll(status: string, mine: string, user: any): Promise<{
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
    create(dto: CreateBookingDto, user: any): Promise<{
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
    approve(id: string, user: any): Promise<{
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
    reject(id: string, user: any): Promise<{
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
    cancel(id: string, user: any): Promise<{
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
