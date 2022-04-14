"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateAdminDTO = exports.CreateAdminDTO = exports.AdminDTO = void 0;
var query_graphql_1 = require("@nestjs-query/query-graphql");
var query_graphql_2 = require("@nestjs-query/query-graphql");
var query_graphql_3 = require("@nestjs-query/query-graphql");
var graphql_1 = require("@nestjs/graphql");
var Hooks = require("@common/nest-gql.hook");
var AdminDTO = /** @class */ (function () {
    function AdminDTO() {
    }
    AdminDTO_1 = AdminDTO;
    var AdminDTO_1;
    __decorate([
        (0, query_graphql_1.IDField)(function () { return graphql_1.Int; })
    ], AdminDTO.prototype, "id");
    __decorate([
        (0, query_graphql_1.FilterableField)()
    ], AdminDTO.prototype, "name");
    __decorate([
        (0, query_graphql_1.FilterableField)()
    ], AdminDTO.prototype, "email");
    __decorate([
        (0, query_graphql_1.FilterableField)({ nullable: true })
    ], AdminDTO.prototype, "contactNo");
    __decorate([
        (0, graphql_1.Field)(function () { return Number; })
    ], AdminDTO.prototype, "createdBy");
    __decorate([
        (0, graphql_1.Field)(function () { return Number; }, { nullable: true })
    ], AdminDTO.prototype, "updatedBy");
    __decorate([
        (0, graphql_1.Field)(function () { return Number; }, { nullable: true })
    ], AdminDTO.prototype, "deletedBy");
    __decorate([
        (0, query_graphql_1.FilterableField)(function () { return graphql_1.GraphQLISODateTime; })
    ], AdminDTO.prototype, "createdAt");
    __decorate([
        (0, query_graphql_1.FilterableField)(function () { return graphql_1.GraphQLISODateTime; }, { nullable: true })
    ], AdminDTO.prototype, "updatedAt");
    __decorate([
        (0, query_graphql_1.FilterableField)(function () { return graphql_1.GraphQLISODateTime; }, { nullable: true })
    ], AdminDTO.prototype, "deletedAt");
    AdminDTO = AdminDTO_1 = __decorate([
        (0, graphql_1.ObjectType)('Admin'),
        (0, query_graphql_1.QueryOptions)({
            enableTotalCount: true,
            pagingStrategy: query_graphql_2.PagingStrategies.OFFSET,
            maxResultsSize: -1
        })
        /* ---------------------------------- Hooks --------------------------------- */
        ,
        (0, query_graphql_3.BeforeCreateOne)(Hooks.CreatedByOneHook),
        (0, query_graphql_3.BeforeCreateMany)(Hooks.CreatedByManyHook),
        (0, query_graphql_3.BeforeUpdateOne)(Hooks.UpdatedByOneHook),
        (0, query_graphql_3.BeforeUpdateMany)(Hooks.UpdatedByManyHook)
        /* -------------------------------- Relations ------------------------------- */
        ,
        (0, query_graphql_1.Relation)('creator', function () { return AdminDTO_1; }, { disableUpdate: true, disableRemove: true })
    ], AdminDTO);
    return AdminDTO;
}());
exports.AdminDTO = AdminDTO;
var CreateAdminDTO = /** @class */ (function () {
    function CreateAdminDTO() {
    }
    __decorate([
        (0, graphql_1.Field)()
    ], CreateAdminDTO.prototype, "name");
    __decorate([
        (0, graphql_1.Field)()
    ], CreateAdminDTO.prototype, "email");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], CreateAdminDTO.prototype, "contactNo");
    __decorate([
        (0, graphql_1.Field)()
    ], CreateAdminDTO.prototype, "password");
    CreateAdminDTO = __decorate([
        (0, graphql_1.InputType)()
    ], CreateAdminDTO);
    return CreateAdminDTO;
}());
exports.CreateAdminDTO = CreateAdminDTO;
var UpdateAdminDTO = /** @class */ (function () {
    function UpdateAdminDTO() {
    }
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdateAdminDTO.prototype, "name");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdateAdminDTO.prototype, "email");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdateAdminDTO.prototype, "contactNo");
    __decorate([
        (0, graphql_1.Field)()
    ], UpdateAdminDTO.prototype, "password");
    UpdateAdminDTO = __decorate([
        (0, graphql_1.InputType)()
    ], UpdateAdminDTO);
    return UpdateAdminDTO;
}());
exports.UpdateAdminDTO = UpdateAdminDTO;
