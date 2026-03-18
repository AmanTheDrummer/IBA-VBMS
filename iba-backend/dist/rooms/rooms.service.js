"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = exports.CreateRoomDto = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateRoomDto {
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "building_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "capacity", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['Classroom', 'Seminar Hall', 'Computer Lab', 'Meeting Room']),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "type", void 0);
let RoomsService = class RoomsService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async findAll(buildingId) {
        let query = this.supabase.db
            .from('rooms')
            .select('*, buildings(id, name, location)')
            .order('name');
        if (buildingId)
            query = query.eq('building_id', buildingId);
        const { data, error } = await query;
        if (error)
            throw error;
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabase.db
            .from('rooms')
            .select('*, buildings(id, name, location)')
            .eq('id', id)
            .single();
        if (error || !data)
            throw new common_1.NotFoundException('Room not found');
        return data;
    }
    async getAvailability(roomId, date) {
        const [{ data: bookings }, { data: blocked }] = await Promise.all([
            this.supabase.db
                .from('bookings')
                .select('slot_id, status')
                .eq('room_id', roomId)
                .eq('date', date)
                .in('status', ['pending', 'approved']),
            this.supabase.db
                .from('blocked_slots')
                .select('slot_id, reason')
                .eq('room_id', roomId)
                .eq('date', date),
        ]);
        return { bookedSlots: bookings || [], blockedSlots: blocked || [] };
    }
    async create(dto) {
        const { data, error } = await this.supabase.db
            .from('rooms')
            .insert({ building_id: dto.building_id, name: dto.name, capacity: dto.capacity, type: dto.type })
            .select('*, buildings(id, name)')
            .single();
        if (error)
            throw error;
        return data;
    }
    async remove(id) {
        const { error } = await this.supabase.db.from('rooms').delete().eq('id', id);
        if (error)
            throw error;
        return { message: 'Room deleted' };
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map