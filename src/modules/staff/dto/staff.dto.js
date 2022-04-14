"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StaffChangePasswordDTO = exports.UpdateOneStaffDTO = exports.UpdateStaffDTO = exports.CreateStaffDTO = exports.StaffDTO = void 0;
var query_graphql_1 = require("@nestjs-query/query-graphql");
var query_graphql_2 = require("@nestjs-query/query-graphql");
var graphql_1 = require("@nestjs/graphql");
var query_graphql_3 = require("@nestjs-query/query-graphql");
var user_dto_1 = require("@modules/user/dto/user.dto");
var _constants_1 = require("@constants");
var Hooks = require("@common/nest-gql.hook");
var StaffDTO = /** @class */ (function () {
    function StaffDTO() {
    }
    __decorate([
        (0, query_graphql_1.IDField)(function () { return graphql_1.Int; })
    ], StaffDTO.prototype, "id");
    __decorate([
        (0, query_graphql_1.FilterableField)()
    ], StaffDTO.prototype, "name");
    __decorate([
        (0, query_graphql_1.FilterableField)()
    ], StaffDTO.prototype, "email");
    __decorate([
        (0, query_graphql_1.FilterableField)({ nullable: true })
    ], StaffDTO.prototype, "contactNo");
    __decorate([
        (0, query_graphql_1.FilterableField)()
    ], StaffDTO.prototype, "fullAccess");
    __decorate([
        (0, query_graphql_1.FilterableField)()
    ], StaffDTO.prototype, "active");
    __decorate([
        (0, graphql_1.Field)(function () { return Number; })
    ], StaffDTO.prototype, "createdBy");
    __decorate([
        (0, graphql_1.Field)(function () { return Number; }, { nullable: true })
    ], StaffDTO.prototype, "updatedBy");
    __decorate([
        (0, graphql_1.Field)(function () { return Number; }, { nullable: true })
    ], StaffDTO.prototype, "deletedBy");
    __decorate([
        (0, query_graphql_1.FilterableField)(function () { return graphql_1.GraphQLISODateTime; })
    ], StaffDTO.prototype, "createdAt");
    __decorate([
        (0, query_graphql_1.FilterableField)(function () { return graphql_1.GraphQLISODateTime; }, { nullable: true })
    ], StaffDTO.prototype, "updatedAt");
    __decorate([
        (0, query_graphql_1.FilterableField)(function () { return graphql_1.GraphQLISODateTime; }, { nullable: true })
    ], StaffDTO.prototype, "deletedAt");
    StaffDTO = __decorate([
        (0, graphql_1.ObjectType)('Staff'),
        (0, query_graphql_1.QueryOptions)({ enableTotalCount: true, pagingStrategy: query_graphql_2.PagingStrategies.OFFSET, maxResultsSize: -1 })
        /* ---------------------------------- Hooks --------------------------------- */
        ,
        (0, query_graphql_3.BeforeCreateOne)(Hooks.CreatedByOneHook),
        (0, query_graphql_3.BeforeCreateMany)(Hooks.CreatedByManyHook),
        (0, query_graphql_3.BeforeUpdateOne)(Hooks.UpdatedByOneHook),
        (0, query_graphql_3.BeforeUpdateMany)(Hooks.UpdatedByManyHook)
        /* -------------------------------- Relations ------------------------------- */
        ,
        (0, query_graphql_2.Relation)('creator', function () { return user_dto_1.UserDTO; }, (0, _constants_1.relationOption)(false))
    ], StaffDTO);
    return StaffDTO;
}());
exports.StaffDTO = StaffDTO;
var CreateStaffDTO = /** @class */ (function () {
    function CreateStaffDTO() {
    }
    __decorate([
        (0, graphql_1.Field)()
    ], CreateStaffDTO.prototype, "name");
    __decorate([
        (0, graphql_1.Field)()
    ], CreateStaffDTO.prototype, "email");
    __decorate([
        (0, graphql_1.Field)()
    ], CreateStaffDTO.prototype, "password");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], CreateStaffDTO.prototype, "contactNo");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], CreateStaffDTO.prototype, "fullAccess");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], CreateStaffDTO.prototype, "active");
    CreateStaffDTO = __decorate([
        (0, graphql_1.InputType)()
    ], CreateStaffDTO);
    return CreateStaffDTO;
}());
exports.CreateStaffDTO = CreateStaffDTO;
var UpdateStaffDTO = /** @class */ (function (_super) {
    __extends(UpdateStaffDTO, _super);
    function UpdateStaffDTO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateStaffDTO = __decorate([
        (0, graphql_1.InputType)()
    ], UpdateStaffDTO);
    return UpdateStaffDTO;
}((0, graphql_1.PartialType)(CreateStaffDTO)));
exports.UpdateStaffDTO = UpdateStaffDTO;
var UpdateOneStaffDTO = /** @class */ (function () {
    function UpdateOneStaffDTO() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return graphql_1.Int; })
    ], UpdateOneStaffDTO.prototype, "id");
    __decorate([
        (0, graphql_1.Field)()
    ], UpdateOneStaffDTO.prototype, "update");
    UpdateOneStaffDTO = __decorate([
        (0, graphql_1.InputType)()
    ], UpdateOneStaffDTO);
    return UpdateOneStaffDTO;
}());
exports.UpdateOneStaffDTO = UpdateOneStaffDTO;
var StaffChangePasswordDTO = /** @class */ (function () {
    function StaffChangePasswordDTO() {
    }
    __decorate([
        (0, graphql_1.Field)()
    ], StaffChangePasswordDTO.prototype, "oldPassword");
    __decorate([
        (0, graphql_1.Field)()
    ], StaffChangePasswordDTO.prototype, "newPassword");
    __decorate([
        (0, graphql_1.Field)()
    ], StaffChangePasswordDTO.prototype, "confirmPassword");
    StaffChangePasswordDTO = __decorate([
        (0, graphql_1.InputType)()
    ], StaffChangePasswordDTO);
    return StaffChangePasswordDTO;
}());
exports.StaffChangePasswordDTO = StaffChangePasswordDTO;
