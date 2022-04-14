"use strict";
exports.__esModule = true;
exports.setResponseCookie = void 0;
var ms_1 = require("ms");
var setResponseCookie = function (res, cookieName, data, expiresId) {
    var expires;
    if (expiresId) {
        var milisecond = (0, ms_1["default"])(expiresId);
        expires = new Date(Date.now() + milisecond);
    }
    res.clearCookie(cookieName);
    res.cookie(cookieName, data, { httpOnly: true, secure: true, expires: expires });
};
exports.setResponseCookie = setResponseCookie;
