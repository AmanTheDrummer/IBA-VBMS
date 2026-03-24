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
exports.BlockedSlotsService = exports.CreateBlockedSlotDto = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const class_validator_1 = require("class-validator");
class CreateBlockedSlotDto {
}
exports.CreateBlockedSlotDto = CreateBlockedSlotDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBlockedSlotDto.prototype, "room_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBlockedSlotDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CreateBlockedSlotDto.prototype, "slot_ids", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBlockedSlotDto.prototype, "reason", void 0);
const SELECT = `
  id, date, slot_id, reason, created_at,
  rooms(id, name, buildings(id, name)),
  time_slots(id, start_time, end_time, label),
  users!blocked_slots_blocked_by_fkey(id, name)
`;
let BlockedSlotsService = class BlockedSlotsService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async findAll(roomId, date) {
        let q = this.supabase.db.from('blocked_slots').select(SELECT).order('date');
        if (roomId)
            q = q.eq('room_id', roomId);
        if (date)
            q = q.eq('date', date);
        const { data, error } = await q;
        if (error)
            throw error;
        return data;
    }
    async create(adminId, dto) {
        const rows = dto.slot_ids.map(slot_id => ({
            room_id: dto.room_id,
            date: dto.date,
            slot_id,
            reason: dto.reason || 'Admin Block',
            blocked_by: adminId,
        }));
        const { data, error } = await this.supabase.db
            .from('blocked_slots')
            .upsert(rows, { onConflict: 'room_id,date,slot_id' })
            .select(SELECT);
        if (error)
            throw error;
        return data;
    }
    async remove(id) {
        const { error } = await this.supabase.db.from('blocked_slots').delete().eq('id', id);
        if (error)
            throw error;
        return { message: 'Slot unblocked' };
    }
};
exports.BlockedSlotsService = BlockedSlotsService;
exports.BlockedSlotsService = BlockedSlotsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], BlockedSlotsService);
//# sourceMappingURL=blocked-slots.service.js.map