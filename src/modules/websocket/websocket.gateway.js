"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.WebSocketGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var websocket_guard_1 = require("../../../../../../src/guards/websocket.guard");
var universal_cookie_1 = require("universal-cookie");
var auth_config_1 = require("@configs/auth.config");
var WebSocketGateway = /** @class */ (function () {
    function WebSocketGateway(socketService, jwt) {
        this.socketService = socketService;
        this.jwt = jwt;
        this.logger = new common_1.Logger('EventsGateway');
    }
    WebSocketGateway.prototype.verify = function (client) {
        var cookies = new universal_cookie_1["default"](client.handshake.headers.cookie);
        var cookie = cookies.get(auth_config_1.CookieName.access);
        try {
            var decoded = this.jwt.verify(cookie, { secret: auth_config_1.JwtConfig.access.secret });
            return decoded;
        }
        catch (e) {
            return null;
        }
    };
    WebSocketGateway.prototype.afterInit = function (server) {
        this.socketService.socket = server;
    };
    WebSocketGateway.prototype.handleDisconnect = function (client) {
        this.logger.log("Client disconnected (".concat(Object.keys(this.server.sockets.sockets).length, "): ").concat(client.id));
    };
    WebSocketGateway.prototype.handleConnection = function (client) {
        try {
            var authData = this.verify(client);
            if (!authData)
                client.disconnect();
            this.logger.log("Client connected (".concat(Object.keys(this.server.sockets.sockets).length, "): ").concat(client.id));
        }
        catch (e) {
            client.disconnect();
            this.logger.log("Client disconnected (".concat(Object.keys(this.server.sockets.sockets).length, "): ").concat(client.id));
        }
    };
    WebSocketGateway.prototype.joinRoom = function (room, client) {
        client.join(room);
        this.logger.log("Client ".concat(client.id, " join to room (").concat(room, ")"));
    };
    WebSocketGateway.prototype.leaveRoom = function (room, client) {
        this.logger.log("Client ".concat(client.id, " leave room (").concat(room, ")"));
        client.leave(room);
    };
    __decorate([
        (0, websockets_1.WebSocketServer)()
    ], WebSocketGateway.prototype, "server");
    __decorate([
        (0, common_1.UseGuards)(websocket_guard_1.WsGuard),
        (0, websockets_1.SubscribeMessage)('join-room'),
        __param(0, (0, websockets_1.MessageBody)()),
        __param(1, (0, websockets_1.ConnectedSocket)())
    ], WebSocketGateway.prototype, "joinRoom");
    __decorate([
        (0, common_1.UseGuards)(websocket_guard_1.WsGuard),
        (0, websockets_1.SubscribeMessage)('leave-room'),
        __param(0, (0, websockets_1.MessageBody)()),
        __param(1, (0, websockets_1.ConnectedSocket)())
    ], WebSocketGateway.prototype, "leaveRoom");
    WebSocketGateway = __decorate([
        (0, websockets_1.WebSocketGateway)({ transports: ['websocket'] })
    ], WebSocketGateway);
    return WebSocketGateway;
}());
exports.WebSocketGateway = WebSocketGateway;
