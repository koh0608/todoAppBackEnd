"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StaffModule = void 0;
var query_sequelize_1 = require("@nestjs-query/query-sequelize");
var query_graphql_1 = require("@nestjs-query/query-graphql");
var common_1 = require("@nestjs/common");
var staff_entity_1 = require("./entities/staff.entity");
var staff_dto_1 = require("./dto/staff.dto");
var auth_guard_1 = require("@guards/auth.guard");
var roles_guard_1 = require("@guards/roles.guard");
var auth_decorator_1 = require("@decorators/auth.decorator");
var _constants_1 = require("@constants");
var staff_resolver_1 = require("./staff.resolver");
var staff_service_1 = require("./staff.service");
var guards = [auth_guard_1.GqlJWTAuthGuard, roles_guard_1.GqlRolesGuard];
var StaffModule = /** @class */ (function () {
    function StaffModule() {
    }
    StaffModule = __decorate([
        (0, common_1.Module)({
            imports: [
                query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                    imports: [query_sequelize_1.NestjsQuerySequelizeModule.forFeature([staff_entity_1.StaffEntity])],
                    resolvers: [
                        {
                            EntityClass: staff_entity_1.StaffEntity,
                            DTOClass: staff_dto_1.StaffDTO,
                            UpdateDTOClass: staff_dto_1.UpdateStaffDTO,
                            read: {
                                guards: guards,
                                decorators: [(0, auth_decorator_1.Roles)(_constants_1.UserType.ADMIN, _constants_1.UserType.STAFF)],
                                one: { name: 'staff' },
                                many: { name: 'staffs' }
                            },
                            create: { disabled: true },
                            update: { guards: guards, decorators: [(0, auth_decorator_1.Roles)(_constants_1.UserType.ADMIN)] },
                            "delete": { guards: guards, decorators: [(0, auth_decorator_1.Roles)(_constants_1.UserType.ADMIN)] }
                        }
                    ]
                })
            ],
            controllers: [],
            providers: [staff_resolver_1.StaffResolver, staff_service_1.StaffService]
        })
    ], StaffModule);
    return StaffModule;
}());
exports.StaffModule = StaffModule;
