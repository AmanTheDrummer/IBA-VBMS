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
exports.BuildingsService = exports.CreateBuildingDto = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const class_validator_1 = require("class-validator");
class CreateBuildingDto {
}
exports.CreateBuildingDto = CreateBuildingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBuildingDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBuildingDto.prototype, "location", void 0);
let BuildingsService = class BuildingsService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async findAll() {
        const { data, error } = await this.supabase.db
            .from('buildings')
            .select('*, rooms(id, name, capacity, type)')
            .order('name');
        if (error)
            throw error;
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabase.db
            .from('buildings')
            .select('*, rooms(id, name, capacity, type)')
            .eq('id', id)
            .single();
        if (error || !data)
            throw new common_1.NotFoundException('Building not found');
        return data;
    }
    async create(dto) {
        const { data, error } = await this.supabase.db
            .from('buildings')
            .insert({ name: dto.name, location: dto.location || '' })
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async remove(id) {
        const { error } = await this.supabase.db.from('buildings').delete().eq('id', id);
        if (error)
            throw error;
        return { message: 'Building and all its rooms deleted' };
    }
};
exports.BuildingsService = BuildingsService;
exports.BuildingsService = BuildingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], BuildingsService);
//# sourceMappingURL=buildings.service.js.map