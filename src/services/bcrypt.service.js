"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BcryptService = exports.comparePassword = exports.hashPassword = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var bcrypt_config_1 = require("../../../../../src/configs/bcrypt.config");
var hashPassword = function (password) { return bcrypt.hashSync(password, bcrypt_config_1.saltRounds); };
exports.hashPassword = hashPassword;
var comparePassword = function (input, password) {
    return new Promise(function (resolve) { return bcrypt.compare(input, password, function (_err, isMatch) { return resolve(isMatch); }); });
};
exports.comparePassword = comparePassword;
var BcryptService = /** @class */ (function () {
    function BcryptService() {
    }
    BcryptService.prototype.hashPassword = function (password) {
        return (0, exports.hashPassword)(password);
    };
    BcryptService.prototype.comparePassword = function (input, password) {
        return (0, exports.comparePassword)(input, password);
    };
    BcryptService = __decorate([
        (0, common_1.Injectable)()
    ], BcryptService);
    return BcryptService;
}());
exports.BcryptService = BcryptService;
