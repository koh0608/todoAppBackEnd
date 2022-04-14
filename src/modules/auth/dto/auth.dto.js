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
exports.LoginResponseDTO = exports.RevokeDTO = exports.LoginDTO = exports.AuthData = exports.StandardResponse = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var common_dto_1 = require("@dto/api/common.dto");
exports.StandardResponse = common_dto_1.StandardResponse;
exports.AuthData = common_dto_1.AuthData;
var LoginDTO = /** @class */ (function () {
    function LoginDTO() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'admin01@test.com' }),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsEmail)()
    ], LoginDTO.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '1234' }),
        (0, class_validator_1.IsNotEmpty)()
    ], LoginDTO.prototype, "password");
    return LoginDTO;
}());
exports.LoginDTO = LoginDTO;
var RevokeDTO = /** @class */ (function () {
    function RevokeDTO() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, class_validator_1.IsNotEmpty)()
    ], RevokeDTO.prototype, "token");
    return RevokeDTO;
}());
exports.RevokeDTO = RevokeDTO;
var LoginResponseDTO = /** @class */ (function (_super) {
    __extends(LoginResponseDTO, _super);
    function LoginResponseDTO() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], LoginResponseDTO.prototype, "payload");
    return LoginResponseDTO;
}(common_dto_1.StandardResponse));
exports.LoginResponseDTO = LoginResponseDTO;
