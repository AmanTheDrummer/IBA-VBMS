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
exports.TimeSlotsModule = exports.TimeSlotsController = exports.TimeSlotsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const auth_module_1 = require("../auth/auth.module");
let TimeSlotsService = class TimeSlotsService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async findAll() {
        const { data, error } = await this.supabase.db
            .from('time_slots').select('*').order('id');
        if (error)
            throw error;
        return data;
    }
};
exports.TimeSlotsService = TimeSlotsService;
exports.TimeSlotsService = TimeSlotsService = __decorate([
    (0, common_3.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], TimeSlotsService);
let TimeSlotsController = class TimeSlotsController {
    constructor(ts) {
        this.ts = ts;
    }
    findAll() { return this.ts.findAll(); }
};
exports.TimeSlotsController = TimeSlotsController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeSlotsController.prototype, "findAll", null);
exports.TimeSlotsController = TimeSlotsController = __decorate([
    (0, common_2.Controller)('time-slots'),
    __metadata("design:paramtypes", [TimeSlotsService])
], TimeSlotsController);
let TimeSlotsModule = class TimeSlotsModule {
};
exports.TimeSlotsModule = TimeSlotsModule;
exports.TimeSlotsModule = TimeSlotsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        providers: [TimeSlotsService],
        controllers: [TimeSlotsController],
    })
], TimeSlotsModule);
//# sourceMappingURL=time-slots.module.js.map