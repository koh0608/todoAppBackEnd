"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdatePasswordDTO = exports.UpdateMeDTO = void 0;
var graphql_1 = require("@nestjs/graphql");
var UpdateMeDTO = /** @class */ (function () {
    function UpdateMeDTO() {
    }
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdateMeDTO.prototype, "email");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdateMeDTO.prototype, "name");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdateMeDTO.prototype, "phone");
    UpdateMeDTO = __decorate([
        (0, graphql_1.InputType)()
    ], UpdateMeDTO);
    return UpdateMeDTO;
}());
exports.UpdateMeDTO = UpdateMeDTO;
var UpdatePasswordDTO = /** @class */ (function () {
    function UpdatePasswordDTO() {
    }
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdatePasswordDTO.prototype, "currentPassword");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdatePasswordDTO.prototype, "newPassword");
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], UpdatePasswordDTO.prototype, "confirmPassword");
    UpdatePasswordDTO = __decorate([
        (0, graphql_1.InputType)()
    ], UpdatePasswordDTO);
    return UpdatePasswordDTO;
}());
exports.UpdatePasswordDTO = UpdatePasswordDTO;
