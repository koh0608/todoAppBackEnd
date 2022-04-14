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
exports.UserEntity = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var admin_entity_1 = require("@modules/admin/entities/admin.entity");
var _constants_1 = require("@constants");
var staff_entity_1 = require("@modules/staff/entities/staff.entity");
var UserEntity = /** @class */ (function (_super) {
    __extends(UserEntity, _super);
    function UserEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        sequelize_typescript_1.AutoIncrement,
        sequelize_typescript_1.Column
    ], UserEntity.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.AllowNull)(false),
        (0, sequelize_typescript_1.IsIn)([Object.values(_constants_1.UserType)]),
        sequelize_typescript_1.Column
    ], UserEntity.prototype, "type");
    __decorate([
        sequelize_typescript_1.Column
    ], UserEntity.prototype, "lastReadNotificationAt");
    __decorate([
        sequelize_typescript_1.Column
    ], UserEntity.prototype, "active");
    __decorate([
        sequelize_typescript_1.Column
    ], UserEntity.prototype, "createdAt");
    __decorate([
        sequelize_typescript_1.Column
    ], UserEntity.prototype, "updatedAt");
    __decorate([
        sequelize_typescript_1.Column
    ], UserEntity.prototype, "deletedAt");
    __decorate([
        (0, sequelize_typescript_1.HasOne)(function () { return admin_entity_1.AdminEntity; })
    ], UserEntity.prototype, "admin");
    __decorate([
        (0, sequelize_typescript_1.HasOne)(function () { return staff_entity_1.StaffEntity; })
    ], UserEntity.prototype, "staff");
    UserEntity = __decorate([
        (0, sequelize_typescript_1.Table)({ tableName: 'users', underscored: true })
    ], UserEntity);
    return UserEntity;
}(sequelize_typescript_1.Model));
exports.UserEntity = UserEntity;
