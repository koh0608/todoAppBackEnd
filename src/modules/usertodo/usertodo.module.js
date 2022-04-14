"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsertodoModule = void 0;
var common_1 = require("@nestjs/common");
var usertodo_service_1 = require("./usertodo.service");
var usertodo_controller_1 = require("./usertodo.controller");
var query_sequelize_1 = require("@nestjs-query/query-sequelize");
var usertodo_entity_1 = require("./entities/usertodo.entity");
var UsertodoModule = /** @class */ (function () {
    function UsertodoModule() {
    }
    UsertodoModule = __decorate([
        (0, common_1.Module)({
            imports: [query_sequelize_1.NestjsQuerySequelizeModule.forFeature([usertodo_entity_1.UserTodoEntity])],
            providers: [usertodo_service_1.UsertodoService],
            controllers: [usertodo_controller_1.UsertodoController]
        })
    ], UsertodoModule);
    return UsertodoModule;
}());
exports.UsertodoModule = UsertodoModule;
