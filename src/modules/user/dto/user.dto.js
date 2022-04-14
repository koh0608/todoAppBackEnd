"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserDTO = void 0;
var query_graphql_1 = require("@nestjs-query/query-graphql");
var query_graphql_2 = require("@nestjs-query/query-graphql");
var graphql_1 = require("@nestjs/graphql");
var admin_dto_1 = require("@modules/admin/dto/admin.dto");
var _constants_1 = require("@constants");
var staff_dto_1 = require("@modules/staff/dto/staff.dto");
var _constants_2 = require("@constants");
(0, graphql_1.registerEnumType)(_constants_1.UserType, { name: 'UserType' });
var UserDTO = /** @class */ (function () {
    function UserDTO() {
    }
    __decorate([
        (0, query_graphql_1.IDField)(function () { return graphql_1.Int; })
    ], UserDTO.prototype, "id");
    __decorate([
        (0, query_graphql_1.FilterableField)(function () { return _constants_1.UserType; })
    ], UserDTO.prototype, "type");
    __decorate([
        (0, query_graphql_1.FilterableField)(function () { return graphql_1.GraphQLISODateTime; })
    ], UserDTO.prototype, "createdAt");
    UserDTO = __decorate([
        (0, graphql_1.ObjectType)('User'),
        (0, query_graphql_1.QueryOptions)({ enableTotalCount: true, pagingStrategy: query_graphql_2.PagingStrategies.OFFSET, maxResultsSize: -1 })
        /* -------------------------------- Relations ------------------------------- */
        ,
        (0, query_graphql_2.Relation)('admin', function () { return admin_dto_1.AdminDTO; }, (0, _constants_2.relationOption)(true)),
        (0, query_graphql_2.Relation)('staff', function () { return staff_dto_1.StaffDTO; }, (0, _constants_2.relationOption)(true))
    ], UserDTO);
    return UserDTO;
}());
exports.UserDTO = UserDTO;
