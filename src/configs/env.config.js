"use strict";
exports.__esModule = true;
exports.envSchema = void 0;
var joi_1 = require("joi");
exports.envSchema = joi_1["default"].object({
    NODE_ENV: joi_1["default"].string().valid('development', 'production', 'staging').required(),
    PORT: joi_1["default"].number()["default"](3000),
    APP_NAME: joi_1["default"].string().required(),
    JWT_SECRET: joi_1["default"].string().required(),
    CORS_VALIDATION: joi_1["default"].boolean().required(),
    ORIGINS: joi_1["default"].string().empty(''),
    ACCESS_COOKIE_NAME: joi_1["default"].string().required(),
    REFRESH_COOKIE_NAME: joi_1["default"].string().required(),
    DB_DRIVER: joi_1["default"].string().required(),
    DB_HOST: joi_1["default"].string().required(),
    DB_USERNAME: joi_1["default"].string().required(),
    DB_PASSWORD: joi_1["default"].string().required(),
    DB_NAME: joi_1["default"].string().required()
    // AWS_S3_URL: Joi.string().required(),
    // AWS_S3_BUCKET: Joi.string().required(),
    // AWS_S3_REGION: Joi.string().required(),
    // AWS_S3_DIRECTORY_PREFIX: Joi.string().required(),
    // AWS_ACCESS_KEY: Joi.string().required(),
    // AWS_SECRET_KEY: Joi.string().required()
});
exports["default"] = exports.envSchema;
