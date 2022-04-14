"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WsGuard = void 0;
var auth_config_1 = require("@configs/auth.config");
var common_1 = require("@nestjs/common");
var jsonwebtoken_1 = require("jsonwebtoken");
var universal_cookie_1 = require("universal-cookie");
var auth_config_2 = require("@configs/auth.config");
var WsGuard = /** @class */ (function () {
    function WsGuard() {
    }
    WsGuard.prototype.canActivate = function (context) {
        var cookies = new universal_cookie_1["default"](context.args[0].handshake.headers.cookie);
        var token = cookies.get(auth_config_2.CookieName.access);
        try {
            var decoded = jsonwebtoken_1["default"].verify(token, auth_config_1.JwtConfig.access.secret);
            if (!decoded || !decoded.id)
                return false;
            return true;
        }
        catch (ex) {
            return false;
        }
    };
    WsGuard = __decorate([
        (0, common_1.Injectable)()
    ], WsGuard);
    return WsGuard;
}());
exports.WsGuard = WsGuard;
