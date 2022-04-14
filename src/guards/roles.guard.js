"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GqlRolesGuard = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var lodash_1 = require("lodash");
var GqlRolesGuard = /** @class */ (function () {
    function GqlRolesGuard(reflector) {
        this.reflector = reflector;
    }
    GqlRolesGuard.prototype.canActivate = function (context) {
        var roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        var ctx = graphql_1.GqlExecutionContext.create(context);
        var req = ctx.getContext().req;
        var user = req.user;
        var valid = lodash_1["default"].includes(roles, user.type);
        if (!valid)
            throw new common_1.UnauthorizedException('Permission Denied');
        return valid;
    };
    GqlRolesGuard = __decorate([
        (0, common_1.Injectable)()
    ], GqlRolesGuard);
    return GqlRolesGuard;
}());
exports.GqlRolesGuard = GqlRolesGuard;
