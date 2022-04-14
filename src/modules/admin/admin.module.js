"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminModule = void 0;
var admin_dto_1 = require("@modules/admin/dto/admin.dto");
var admin_entity_1 = require("@modules/admin/entities/admin.entity");
var query_sequelize_1 = require("@nestjs-query/query-sequelize");
var query_graphql_1 = require("@nestjs-query/query-graphql");
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("@guards/auth.guard");
var admin_resolver_1 = require("./admin.resolver");
var admin_service_1 = require("./admin.service");
var entities = [admin_entity_1.AdminEntity];
var guards = [auth_guard_1.GqlJWTAuthGuard];
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        (0, common_1.Module)({
            imports: [
                query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                    imports: [query_sequelize_1.NestjsQuerySequelizeModule.forFeature(entities)],
                    resolvers: [
                        {
                            EntityClass: admin_entity_1.AdminEntity,
                            DTOClass: admin_dto_1.AdminDTO,
                            CreateDTOClass: admin_dto_1.CreateAdminDTO,
                            UpdateDTOClass: admin_dto_1.UpdateAdminDTO,
                            read: { guards: guards },
                            create: { disabled: true },
                            update: { guards: guards, many: { disabled: true } },
                            "delete": { guards: guards }
                        }
                    ]
                })
            ],
            controllers: [],
            providers: [admin_resolver_1.AdminResolver, admin_service_1.AdminService]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
