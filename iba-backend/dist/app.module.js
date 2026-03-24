"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_module_1 = require("./supabase/supabase.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const buildings_module_1 = require("./buildings/buildings.module");
const rooms_module_1 = require("./rooms/rooms.module");
const bookings_module_1 = require("./bookings/bookings.module");
const blocked_slots_module_1 = require("./blocked-slots/blocked-slots.module");
const time_slots_module_1 = require("./time-slots/time-slots.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            supabase_module_1.SupabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            buildings_module_1.BuildingsModule,
            rooms_module_1.RoomsModule,
            bookings_module_1.BookingsModule,
            blocked_slots_module_1.BlockedSlotsModule,
            time_slots_module_1.TimeSlotsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map