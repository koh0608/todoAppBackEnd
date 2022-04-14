"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthData = exports.StandardResponse = void 0;
var swagger_1 = require("@nestjs/swagger");
var StandardResponse = /** @class */ (function () {
    function StandardResponse() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'Success' })
    ], StandardResponse.prototype, "message");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 200 })
    ], StandardResponse.prototype, "statusCode");
    return StandardResponse;
}());
exports.StandardResponse = StandardResponse;
var AuthData = /** @class */ (function () {
    function AuthData() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], AuthData.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], AuthData.prototype, "type");
    return AuthData;
}());
exports.AuthData = AuthData;
