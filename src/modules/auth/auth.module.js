"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.AuthModule = void 0;
var admin_entity_1 = require("@modules/admin/entities/admin.entity");
var auth_strategy_1 = require("@modules/auth/auth.strategy");
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var sequelize_1 = require("@nestjs/sequelize");
var admin_auth_controller_1 = require("./controllers/admin-auth.controller");
var admin_auth_service_1 = require("./services/admin-auth.service");
var Entities = [admin_entity_1.AdminEntity];
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule_1 = AuthModule;
    var AuthModule_1;
    AuthModule = AuthModule_1 = __decorate([
        (0, common_1.Module)({
            imports: [sequelize_1.SequelizeModule.forFeature(Entities), jwt_1.JwtModule.register({})],
            providers: __spreadArray(__spreadArray([], auth_strategy_1.Strategies, true), [admin_auth_service_1.AdminAuthService], false),
            exports: [AuthModule_1],
            controllers: [admin_auth_controller_1.AdminAuthController]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
