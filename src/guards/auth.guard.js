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
exports.GqlJWTAuthGuard = exports.JWTRefreshGuard = exports.JWTAuthGuard = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var graphql_1 = require("@nestjs/graphql");
var _constants_1 = require("@constants");
/* ----------------------------- API Auth Guards ---------------------------- */
var JWTAuthGuard = /** @class */ (function (_super) {
    __extends(JWTAuthGuard, _super);
    function JWTAuthGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JWTAuthGuard = __decorate([
        (0, common_1.Injectable)()
    ], JWTAuthGuard);
    return JWTAuthGuard;
}((0, passport_1.AuthGuard)(_constants_1.AuthStrategy.JWT_ACCESS)));
exports.JWTAuthGuard = JWTAuthGuard;
var JWTRefreshGuard = /** @class */ (function (_super) {
    __extends(JWTRefreshGuard, _super);
    function JWTRefreshGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JWTRefreshGuard = __decorate([
        (0, common_1.Injectable)()
    ], JWTRefreshGuard);
    return JWTRefreshGuard;
}((0, passport_1.AuthGuard)(_constants_1.AuthStrategy.JWT_REFRESH)));
exports.JWTRefreshGuard = JWTRefreshGuard;
/* --------------------------- Graphql Auth Guards -------------------------- */
var GqlJWTAuthGuard = /** @class */ (function (_super) {
    __extends(GqlJWTAuthGuard, _super);
    function GqlJWTAuthGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GqlJWTAuthGuard.prototype.getRequest = function (context) {
        var ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    };
    GqlJWTAuthGuard = __decorate([
        (0, common_1.Injectable)()
    ], GqlJWTAuthGuard);
    return GqlJWTAuthGuard;
}((0, passport_1.AuthGuard)(_constants_1.AuthStrategy.JWT_ACCESS)));
exports.GqlJWTAuthGuard = GqlJWTAuthGuard;
