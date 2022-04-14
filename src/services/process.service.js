"use strict";
exports.__esModule = true;
exports.terminate = void 0;
var logger_service_1 = require("./logger.service");
var terminate = function (server, options) {
    if (options === void 0) { options = { coredump: false, timeout: 500 }; }
    // Exit function
    var exit = function (code) {
        options.coredump ? process.abort() : process.exit(code);
    };
    return function (code, reason) { return function (err) {
        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            logger_service_1["default"].error("[".concat(code, "] (").concat(reason, "): ").concat(err.message, ", ").concat(err.stack));
            console.log(err.message, err.stack);
        }
        // Attempt a graceful shutdown
        server.close();
        setTimeout(exit, options.timeout).unref();
    }; };
};
exports.terminate = terminate;
