"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AdminAuthController = void 0;
var auth_config_1 = require("@configs/auth.config");
var auth_decorator_1 = require("@decorators/auth.decorator");
var auth_guard_1 = require("@guards/auth.guard");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var cookie_service_1 = require("@services/cookie.service");
var DTO = require("../dto/auth.dto");
var AdminAuthController = /** @class */ (function () {
    function AdminAuthController(authService) {
        this.authService = authService;
    }
    AdminAuthController.prototype.login = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, accessToken, refreshToken, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.authService.login(body.email, body.password)];
                    case 1:
                        _a = _b.sent(), data = _a.data, accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                        (0, cookie_service_1.setResponseCookie)(res, auth_config_1.CookieName.access, accessToken);
                        (0, cookie_service_1.setResponseCookie)(res, auth_config_1.CookieName.refresh, refreshToken, auth_config_1.JwtConfig.refresh.expiresIn);
                        res.status(200);
                        return [2 /*return*/, {
                                message: 'Success',
                                statusCode: 200,
                                payload: data
                            }];
                    case 2:
                        e_1 = _b.sent();
                        throw new common_1.HttpException(e_1.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdminAuthController.prototype.logout = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.clearCookie(auth_config_1.CookieName.access);
                    res.clearCookie(auth_config_1.CookieName.refresh);
                    res.status(200);
                    req.logout();
                    return [2 /*return*/, { message: 'Logout successful', statusCode: 200 }];
                }
                catch (e) {
                    throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return [2 /*return*/];
            });
        });
    };
    AdminAuthController.prototype.revoke = function (_req, res, user) {
        return __awaiter(this, void 0, void 0, function () {
            var data, accessToken, refreshToken, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.authService.revoke(user.id)];
                    case 1:
                        data = _a.sent();
                        accessToken = data.accessToken, refreshToken = data.refreshToken;
                        (0, cookie_service_1.setResponseCookie)(res, auth_config_1.CookieName.access, accessToken);
                        (0, cookie_service_1.setResponseCookie)(res, auth_config_1.CookieName.refresh, refreshToken, auth_config_1.JwtConfig.refresh.expiresIn);
                        res.status(200);
                        return [2 /*return*/, {
                                message: 'Success',
                                statusCode: 200,
                                payload: data.data
                            }];
                    case 2:
                        e_2 = _a.sent();
                        throw new common_1.HttpException(e_2.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Admin Login' }),
        (0, swagger_1.ApiResponse)({ status: 200, type: DTO.LoginResponseDTO }),
        (0, swagger_1.ApiBody)({ type: DTO.LoginDTO }),
        (0, common_1.Post)('login'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)({ passthrough: true }))
    ], AdminAuthController.prototype, "login");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Dashboard Logout' }),
        (0, swagger_1.ApiResponse)({ status: 200, type: DTO.StandardResponse }),
        (0, common_1.UseGuards)(auth_guard_1.JWTAuthGuard),
        (0, common_1.Post)('logout'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)({ passthrough: true }))
    ], AdminAuthController.prototype, "logout");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Refresh Access Token' }),
        (0, swagger_1.ApiResponse)({ status: 200, type: DTO.LoginResponseDTO }),
        (0, swagger_1.ApiBody)({ type: DTO.RevokeDTO }),
        (0, common_1.Post)('refresh'),
        (0, common_1.UseGuards)(auth_guard_1.JWTRefreshGuard),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)({ passthrough: true })),
        __param(2, (0, auth_decorator_1.AuthData)())
    ], AdminAuthController.prototype, "revoke");
    AdminAuthController = __decorate([
        (0, swagger_1.ApiTags)('AdminAuthentication'),
        (0, common_1.Controller)('auth/admin')
    ], AdminAuthController);
    return AdminAuthController;
}());
exports.AdminAuthController = AdminAuthController;
