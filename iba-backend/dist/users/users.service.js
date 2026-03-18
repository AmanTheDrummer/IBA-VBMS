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
exports.UsersService = exports.CreateUserDto = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const auth_service_1 = require("../auth/auth.service");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "erp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['student', 'programoffice', 'admin']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
let UsersService = class UsersService {
    constructor(supabase, authService) {
        this.supabase = supabase;
        this.authService = authService;
    }
    async findAll() {
        const { data, error } = await this.supabase.db
            .from('users')
            .select('id, erp, name, email, role, created_at')
            .order('created_at', { ascending: true });
        if (error)
            throw error;
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabase.db
            .from('users')
            .select('id, erp, name, email, role, created_at')
            .eq('id', id)
            .single();
        if (error || !data)
            throw new common_1.NotFoundException('User not found');
        return data;
    }
    async create(dto) {
        const { data: existing } = await this.supabase.db
            .from('users').select('id').eq('erp', dto.erp).single();
        if (existing)
            throw new common_1.ConflictException('ERP/username already exists');
        const hashed = await this.authService.hashPassword(dto.password);
        const { data, error } = await this.supabase.db
            .from('users')
            .insert({ erp: dto.erp, name: dto.name, email: dto.email, password: hashed, role: dto.role })
            .select('id, erp, name, email, role, created_at')
            .single();
        if (error)
            throw error;
        return data;
    }
    async remove(id) {
        const { error } = await this.supabase.db.from('users').delete().eq('id', id);
        if (error)
            throw error;
        return { message: 'User deleted' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map