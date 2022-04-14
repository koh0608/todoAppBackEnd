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
exports.getFileSize = exports.S3Service = exports.uploadReadableStreamToS3 = exports.uploadFileToS3 = exports.uploadObjectToS3 = exports.getObjectFromS3 = exports.deleteObjectFromS3 = void 0;
var aws_sdk_1 = require("aws-sdk");
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var path_1 = require("path");
var uuid_1 = require("uuid");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var parseFileUrlForDeletion = function (url) {
    var AWS_S3_URL = process.env.AWS_S3_URL;
    return lodash_1["default"].replace(url, "".concat(AWS_S3_URL, "/"), '');
};
var _a = process.env, AWS_S3_BUCKET = _a.AWS_S3_BUCKET, AWS_ACCESS_KEY = _a.AWS_ACCESS_KEY, AWS_SECRET_KEY = _a.AWS_SECRET_KEY, AWS_S3_REGION = _a.AWS_S3_REGION;
var Options = { publicAccess: true };
var Bucket = AWS_S3_BUCKET || '';
aws_sdk_1["default"].config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY });
var s3Bucket = new aws_sdk_1["default"].S3({
    params: { Bucket: Bucket, timeout: 6000000 },
    region: AWS_S3_REGION
});
var deleteObjectFromS3 = function (filePath) {
    return new Promise(function (resolve, reject) {
        s3Bucket.deleteObject({ Key: parseFileUrlForDeletion(filePath), Bucket: Bucket }, function (error, data) {
            if (error !== null)
                return reject(error);
            return resolve(data);
        });
    });
};
exports.deleteObjectFromS3 = deleteObjectFromS3;
var getObjectFromS3 = function (filePath) {
    return new Promise(function (resolve, reject) {
        s3Bucket.getObject({ Key: filePath, Bucket: Bucket }, function (error, data) {
            if (error != null) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.getObjectFromS3 = getObjectFromS3;
var uploadObjectToS3 = function (directory, stream, extension, _a) {
    var _b = _a === void 0 ? Options : _a, _c = _b.publicAccess, publicAccess = _c === void 0 ? true : _c, contentType = _b.contentType;
    // eslint-disable-next-line consistent-return
    return new Promise(function (resolve, reject) {
        if (directory.substr(directory.length - 1) !== '/')
            return reject(new Error('uploadObjectToS3: last character of "directory" must be "/" '));
        if (extension.charAt(0) !== '.')
            return reject(new Error('uploadObjectToS3: first character of "extension" must be "." '));
        var extra = {};
        if (publicAccess)
            extra.ACL = 'public-read';
        if (contentType)
            extra.ContentType = contentType;
        s3Bucket.upload(__assign({ Key: "".concat(process.env.AWS_S3_DIRECTORY_PREFIX || '').concat(directory).concat((0, uuid_1.v4)()).concat(extension), Bucket: Bucket, Body: stream }, extra), function (err, data) {
            if (err)
                return reject(err);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            var key = lodash_1["default"].get(data, 'Key') || lodash_1["default"].get(data, 'key');
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            return resolve(__assign(__assign({}, data), { key: key }));
        });
    });
};
exports.uploadObjectToS3 = uploadObjectToS3;
/**
 * Upload formidable file to S3
 - @param file - formidable parsed "File" object
 - @param directory - S3 directory path
 */
var uploadFileToS3 = function (file, directory, option) {
    if (option === void 0) { option = Options; }
    return __awaiter(void 0, void 0, void 0, function () {
        var stream, extension, response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    stream = fs_1["default"].readFileSync(file.path);
                    extension = path_1["default"].extname(file.name);
                    return [4 /*yield*/, (0, exports.uploadObjectToS3)(directory, stream, extension, option)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Promise.resolve(response)];
                case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.uploadFileToS3 = uploadFileToS3;
var uploadReadableStreamToS3 = function (stream, directory, filename, option) { return __awaiter(void 0, void 0, void 0, function () {
    var extension, response, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                extension = path_1["default"].extname(filename);
                return [4 /*yield*/, (0, exports.uploadObjectToS3)(directory, stream, extension, option)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, Promise.resolve(response)];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/, Promise.reject(e_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.uploadReadableStreamToS3 = uploadReadableStreamToS3;
var S3Service = /** @class */ (function () {
    function S3Service() {
        this.deleteObjectFromS3 = exports.deleteObjectFromS3;
        this.getObjectFromS3 = exports.getObjectFromS3;
        this.uploadObjectToS3 = exports.uploadObjectToS3;
        this.uploadFileToS3 = exports.uploadFileToS3;
        this.uploadReadableStreamToS3 = exports.uploadReadableStreamToS3;
    }
    return S3Service;
}());
exports.S3Service = S3Service;
var getFileSize = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, s3Bucket
                .headObject({ Key: key, Bucket: Bucket })
                .promise()
                .then(function (res) { return res.ContentLength; })];
    });
}); };
exports.getFileSize = getFileSize;
