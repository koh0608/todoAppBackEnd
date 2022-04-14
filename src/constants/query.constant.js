"use strict";
exports.__esModule = true;
exports.relationOption = exports.queryOption = void 0;
var query_graphql_1 = require("@nestjs-query/query-graphql");
exports.queryOption = {
    enableTotalCount: true,
    pagingStrategy: query_graphql_1.PagingStrategies.OFFSET,
    maxResultsSize: -1
};
var relationOption = function (nullable) {
    if (nullable === void 0) { nullable = false; }
    return ({
        disableUpdate: true,
        disableRemove: true,
        nullable: nullable,
        maxResultsSize: -1
    });
};
exports.relationOption = relationOption;
