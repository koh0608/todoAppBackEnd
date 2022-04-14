"use strict";
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
exports.createCargo = exports.numberToArray = exports.generateRunningNumber = exports.asyncForEach = exports.streamToBuffer = exports.splitStringToArray = exports.trimString = void 0;
var lodash_1 = require("lodash");
var async_1 = require("async");
/** Remove white space in string */
var trimString = function (str) {
    if (!str)
        return str;
    if (!lodash_1["default"].isString(str))
        return str;
    return str.replace(/^\s+|\s+$/g, '');
};
exports.trimString = trimString;
var splitStringToArray = function (str, symbol) {
    if (!str)
        return [];
    var result = str.split(symbol);
    result.forEach(function (val, index) {
        result[index] = (0, exports.trimString)(val);
    });
    return lodash_1["default"].isEmpty(result) ? [] : result;
};
exports.splitStringToArray = splitStringToArray;
var streamToBuffer = function (stream) {
    var chunks = [];
    return new Promise(function (resolve, reject) {
        stream
            .on('data', function (chunk) { return chunks.push(chunk); })
            .on('end', function () { return resolve(Buffer.concat(chunks)); })
            .on('error', function (err) { return reject(err); });
    });
};
exports.streamToBuffer = streamToBuffer;
var asyncForEach = function (array, callback) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var index, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < array.length)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, callback(array[index], index, array)];
                case 3:
                    _a.sent(); //eslint-disable-line
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    reject(e_1);
                    return [3 /*break*/, 5];
                case 5:
                    index++;
                    return [3 /*break*/, 1];
                case 6:
                    resolve(true);
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.asyncForEach = asyncForEach;
var generateRunningNumber = function (number, prefix, options) {
    var length = lodash_1["default"].get(options, 'length') || 8;
    var suffix = lodash_1["default"].get(options, 'suffix') || '8';
    return "".concat(prefix).concat(lodash_1["default"].padStart("".concat(number), length, '0')).concat(suffix || '');
};
exports.generateRunningNumber = generateRunningNumber;
var numberToArray = function (value) {
    var result = [];
    for (var i = 1; i <= value; i++) {
        result.push(i);
    }
    return result;
};
exports.numberToArray = numberToArray;
var createCargo = function (size) {
    return async_1["default"].cargo(function (tasks, callback) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(lodash_1["default"].map(tasks, function (task) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!task) return [3 /*break*/, 2];
                                    return [4 /*yield*/, task()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); }))];
                case 1:
                    _a.sent();
                    callback();
                    return [2 /*return*/];
            }
        });
    }); }, size || 5);
};
exports.createCargo = createCargo;
