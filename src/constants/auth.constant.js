"use strict";
exports.__esModule = true;
exports.AuthStrategy = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "ADMIN";
    UserType["STAFF"] = "STAFF";
})(UserType = exports.UserType || (exports.UserType = {}));
var AuthStrategy;
(function (AuthStrategy) {
    AuthStrategy["JWT_ACCESS"] = "jwt-access";
    AuthStrategy["JWT_REFRESH"] = "jwt-refresh";
})(AuthStrategy = exports.AuthStrategy || (exports.AuthStrategy = {}));
