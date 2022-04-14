"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BooleanResponse = exports.ActionResponse = void 0;
var graphql_1 = require("@nestjs/graphql");
var ActionResponse = /** @class */ (function () {
    function ActionResponse() {
    }
    __decorate([
        (0, graphql_1.Field)()
    ], ActionResponse.prototype, "message");
    __decorate([
        (0, graphql_1.Field)()
    ], ActionResponse.prototype, "success");
    ActionResponse = __decorate([
        (0, graphql_1.ObjectType)()
    ], ActionResponse);
    return ActionResponse;
}());
exports.ActionResponse = ActionResponse;
var BooleanResponse = /** @class */ (function () {
    function BooleanResponse() {
    }
    __decorate([
        (0, graphql_1.Field)()
    ], BooleanResponse.prototype, "payload");
    BooleanResponse = __decorate([
        (0, graphql_1.ObjectType)()
    ], BooleanResponse);
    return BooleanResponse;
}());
exports.BooleanResponse = BooleanResponse;
