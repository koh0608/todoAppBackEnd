"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var query_sequelize_1 = require("@nestjs-query/query-sequelize");
var query_graphql_1 = require("@nestjs-query/query-graphql");
var common_1 = require("@nestjs/common");
var user_entity_1 = require("./entities/user.entity");
var user_dto_1 = require("./dto/user.dto");
var auth_guard_1 = require("@guards/auth.guard");
var guards = [auth_guard_1.GqlJWTAuthGuard];
var entities = [user_entity_1.UserEntity];
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        (0, common_1.Module)({
            imports: [
                query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                    imports: [query_sequelize_1.NestjsQuerySequelizeModule.forFeature(entities)],
                    resolvers: [
                        {
                            EntityClass: user_entity_1.UserEntity,
                            DTOClass: user_dto_1.UserDTO,
                            read: { guards: guards },
                            create: { disabled: true },
                            update: { disabled: true },
                            "delete": { disabled: true }
                        }
                    ]
                })
            ],
            controllers: [],
            providers: []
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
