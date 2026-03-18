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
exports.BookingsService = exports.CreateBookingDto = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateBookingDto {
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "room_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "date", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "slot_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "purpose", void 0);
const SELECT = `
  id, date, slot_id, purpose, status, created_at, updated_at,
  users!bookings_user_id_fkey(id, erp, name, email),
  rooms(id, name, buildings(id, name)),
  time_slots(id, start_time, end_time, label)
`;
let BookingsService = class BookingsService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async findAll(filters = {}) {
        let q = this.supabase.db.from('bookings').select(SELECT).order('created_at', { ascending: false });
        if (filters.status)
            q = q.eq('status', filters.status);
        if (filters.userId)
            q = q.eq('user_id', filters.userId);
        const { data, error } = await q;
        if (error)
            throw error;
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabase.db
            .from('bookings').select(SELECT).eq('id', id).single();
        if (error || !data)
            throw new common_1.NotFoundException('Booking not found');
        return data;
    }
    async create(userId, dto) {
        const { data: blocked } = await this.supabase.db
            .from('blocked_slots')
            .select('id')
            .eq('room_id', dto.room_id)
            .eq('date', dto.date)
            .eq('slot_id', dto.slot_id)
            .single();
        if (blocked)
            throw new common_1.ConflictException('This slot is blocked by admin');
        const { data: existing } = await this.supabase.db
            .from('bookings')
            .select('id')
            .eq('room_id', dto.room_id)
            .eq('date', dto.date)
            .eq('slot_id', dto.slot_id)
            .in('status', ['pending', 'approved'])
            .single();
        if (existing)
            throw new common_1.ConflictException('This slot is already booked');
        const { data, error } = await this.supabase.db
            .from('bookings')
            .insert({ user_id: userId, room_id: dto.room_id, date: dto.date, slot_id: dto.slot_id, purpose: dto.purpose, status: 'pending' })
            .select(SELECT)
            .single();
        if (error)
            throw error;
        return data;
    }
    async updateStatus(id, status, reviewerId) {
        const { data, error } = await this.supabase.db
            .from('bookings')
            .update({ status, reviewed_by: reviewerId })
            .eq('id', id)
            .select(SELECT)
            .single();
        if (error || !data)
            throw new common_1.NotFoundException('Booking not found');
        return data;
    }
    async cancel(id, requesterId, requesterRole) {
        const booking = await this.findOne(id);
        if (requesterRole === 'student' && booking.users?.id !== requesterId) {
            throw new common_1.ForbiddenException('You can only cancel your own bookings');
        }
        if (!['pending', 'approved'].includes(booking.status)) {
            throw new common_1.BadRequestException('Only pending or approved bookings can be cancelled');
        }
        return this.updateStatus(id, 'rejected', requesterId);
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map