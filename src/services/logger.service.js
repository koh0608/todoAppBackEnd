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
exports.__esModule = true;
exports.logger = exports.myFormat = void 0;
require("winston-daily-rotate-file");
var winston_1 = require("winston");
var format = winston_1["default"].format;
var custom = {
    levels: {
        mail: -1,
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        http: 5
    },
    colors: {
        error: 'red',
        warn: 'orange',
        info: 'white bold yellow',
        verbose: 'blue',
        debug: 'green',
        http: 'pink',
        mail: 'cyan'
    }
};
var NODE_ENV = process.env.NODE_ENV;
winston_1["default"].addColors(custom.colors);
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
exports.myFormat = format.printf(function (info) { return "[".concat(info.timestamp, "] [").concat(info.level, "] ").concat(info.message); });
var configs = {
    console: {
        handleExceptions: true,
        level: NODE_ENV === 'development' ? 'debug' : 'error',
        format: format.combine(format.timestamp(), format.colorize({ colors: custom.colors }), format.json(), exports.myFormat)
    },
    verbose: {
        format: format.combine(format.timestamp(), format.json(), exports.myFormat)
    },
    daily: {
        maxSize: '20m'
    }
};
var transports = {
    debug: new winston_1["default"].transports.DailyRotateFile(__assign(__assign(__assign({}, configs.verbose), configs.daily), { dirname: './logs/info/', filename: '%DATE%.log', level: 'debug' })),
    error: new winston_1["default"].transports.DailyRotateFile(__assign(__assign(__assign({}, configs.verbose), configs.daily), { dirname: './logs/error/', filename: '%DATE%.log', level: 'error' })),
    mail: new winston_1["default"].transports.DailyRotateFile(__assign(__assign(__assign({}, configs.verbose), configs.daily), { dirname: './logs/mail/', filename: '%DATE%.log', level: 'mail' }))
};
exports.logger = winston_1["default"].createLogger({
    levels: custom.levels,
    level: NODE_ENV === 'development' ? 'debug' : 'error',
    transports: [transports.debug, transports.error, transports.mail, new winston_1["default"].transports.Console(configs.console)]
});
exports["default"] = exports.logger;
