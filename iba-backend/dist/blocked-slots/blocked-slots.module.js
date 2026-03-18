"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedSlotsModule = void 0;
const common_1 = require("@nestjs/common");
const blocked_slots_service_1 = require("./blocked-slots.service");
const blocked_slots_controller_1 = require("./blocked-slots.controller");
const auth_module_1 = require("../auth/auth.module");
let BlockedSlotsModule = class BlockedSlotsModule {
};
exports.BlockedSlotsModule = BlockedSlotsModule;
exports.BlockedSlotsModule = BlockedSlotsModule = __decorate([
    (0, common_1.Module)({ imports: [auth_module_1.AuthModule], providers: [blocked_slots_service_1.BlockedSlotsService], controllers: [blocked_slots_controller_1.BlockedSlotsController] })
], BlockedSlotsModule);
//# sourceMappingURL=blocked-slots.module.js.map