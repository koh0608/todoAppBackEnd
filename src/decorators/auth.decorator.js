"use strict";
exports.__esModule = true;
exports.Roles = exports.AuthData = exports.GqlAuthUser = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var common_2 = require("@nestjs/common");
exports.GqlAuthUser = (0, common_1.createParamDecorator)(function (_data, context) {
    var ctx = graphql_1.GqlExecutionContext.create(context);
    var req = ctx.getContext().req;
    return req.user;
});
exports.AuthData = (0, common_1.createParamDecorator)(function (_data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
var Roles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return (0, common_2.SetMetadata)('roles', roles);
};
exports.Roles = Roles;
