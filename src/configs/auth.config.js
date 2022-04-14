"use strict";
exports.__esModule = true;
exports.JwtConfig = exports.CookieName = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var secret = process.env.JWT_SECRET;
exports.CookieName = {
    access: process.env.ACCESS_COOKIE_NAME,
    refresh: process.env.REFRESH_COOKIE_NAME
};
exports.JwtConfig = {
    access: { secret: "admin_acs_".concat(secret), expiresIn: '15min' },
    refresh: { secret: "admin_rsh_".concat(secret), expiresIn: '3d' }
};
