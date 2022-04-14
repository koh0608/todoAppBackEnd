"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.StaffService = void 0;
var common_1 = require("@nestjs/common");
var staff_entity_1 = require("./entities/staff.entity");
var user_entity_1 = require("@modules/user/entities/user.entity");
var _constants_1 = require("@constants");
var bcrypt_service_1 = require("@services/bcrypt.service");
var StaffService = /** @class */ (function () {
    function StaffService(sequelize) {
        this.sequelize = sequelize;
    }
    StaffService.prototype.createOneStaff = function (input, authData, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var staff_1, userData_1, user, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        userData_1 = { type: _constants_1.UserType.STAFF };
                        if (!transaction) return [3 /*break*/, 3];
                        return [4 /*yield*/, user_entity_1.UserEntity.create(userData_1, { transaction: transaction })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, staff_entity_1.StaffEntity.create(__assign(__assign({}, input), { id: user.id, createdBy: authData.id }), { transaction: transaction })];
                    case 2:
                        staff_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.sequelize.transaction(function (t) { return __awaiter(_this, void 0, void 0, function () {
                            var user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, user_entity_1.UserEntity.create(userData_1, { transaction: t })];
                                    case 1:
                                        user = _a.sent();
                                        return [4 /*yield*/, staff_entity_1.StaffEntity.create(__assign(__assign({}, input), { id: user.id, createdBy: authData.id }), { transaction: t })];
                                    case 2:
                                        staff_1 = _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, Promise.resolve(staff_1)];
                    case 6:
                        e_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    StaffService.prototype.staffUpdateMeInfo = function (input, authData) {
        return __awaiter(this, void 0, void 0, function () {
            var staff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, staff_entity_1.StaffEntity.findByPk(authData.id)];
                    case 1:
                        staff = _a.sent();
                        if (!staff)
                            throw new Error("Staff with id \"".concat(authData.id, "\" was not found"));
                        return [4 /*yield*/, staff.update(input)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, staff];
                }
            });
        });
    };
    StaffService.prototype.staffChangePassword = function (input, authData) {
        return __awaiter(this, void 0, void 0, function () {
            var staff, isPasswordValid, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (input.newPassword !== input.confirmPassword) {
                            throw new Error('Confirmation password does not match with new password');
                        }
                        return [4 /*yield*/, staff_entity_1.StaffEntity.findByPk(authData.id)];
                    case 1:
                        staff = _a.sent();
                        if (!staff)
                            throw new Error("Staff with id \"".concat(authData.id, "\" was not found"));
                        return [4 /*yield*/, (0, bcrypt_service_1.comparePassword)(input.oldPassword, staff.password)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid)
                            throw new common_1.NotAcceptableException('Incorrect old password given.');
                        return [4 /*yield*/, staff.update({ password: input.newPassword })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve(staff)];
                    case 4:
                        e_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    StaffService = __decorate([
        (0, common_1.Injectable)()
    ], StaffService);
    return StaffService;
}());
exports.StaffService = StaffService;
