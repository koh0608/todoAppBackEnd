"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WebSocketModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var websocket_gateway_1 = require("./websocket.gateway");
var websocket_service_1 = require("./websocket.service");
var WebSocketModule = /** @class */ (function () {
    function WebSocketModule() {
    }
    WebSocketModule = __decorate([
        (0, common_1.Global)(),
        (0, common_1.Module)({
            imports: [jwt_1.JwtModule.register({})],
            providers: [websocket_gateway_1.WebSocketGateway, websocket_service_1.WebSocketService],
            exports: [websocket_service_1.WebSocketService]
        })
    ], WebSocketModule);
    return WebSocketModule;
}());
exports.WebSocketModule = WebSocketModule;
