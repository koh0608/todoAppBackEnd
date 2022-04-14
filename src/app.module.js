"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var graphql_1 = require("@nestjs/graphql");
var sequelize_1 = require("@nestjs/sequelize");
var graphql_upload_1 = require("graphql-upload");
var throttler_1 = require("@nestjs/throttler");
var apollo_1 = require("@nestjs/apollo");
var schedule_1 = require("@nestjs/schedule");
var event_emitter_1 = require("@nestjs/event-emitter");
var env_config_1 = require("@configs/env.config");
// Modules
var user_module_1 = require("@modules/user/user.module");
var auth_module_1 = require("@modules/auth/auth.module");
var admin_module_1 = require("./modules/admin/admin.module");
var staff_module_1 = require("./modules/staff/staff.module");
var websocket_module_1 = require("./modules/websocket/websocket.module");
var app_config_1 = require("@configs/app.config");
var app_config_2 = require("@configs/app.config");
var usertodo_module_1 = require("./modules/usertodo/usertodo.module");
var todo_module_1 = require("./modules/todo/todo.module");
var Configs = config_1.ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
    validationSchema: env_config_1["default"],
    validationOptions: {
        allowUnknown: true,
        abortEarly: true
    }
});
var GraphQL = graphql_1.GraphQLModule.forRoot({
    driver: apollo_1.ApolloDriver,
    autoSchemaFile: true,
    sortSchema: true,
    introspection: !app_config_1.isProduction,
    cors: {
        credentials: true,
        origin: function (origin, callback) {
            if (!origin || app_config_2.origins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                if (process.env.CORS_VALIDATION === 'true') {
                    callback(new Error('Not allowed by CORS'));
                }
                else {
                    callback(null, true);
                }
            }
        }
    }
});
var Sequelize = sequelize_1.SequelizeModule.forRoot({
    dialect: 'mysql',
    host: process.env['DB_HOST'],
    port: 3306,
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    autoLoadModels: true,
    synchronize: false,
    logging: !app_config_1.isProduction
});
var Throttler = throttler_1.ThrottlerModule.forRoot({
    ttl: 60,
    limit: 60 * 25,
    ignoreUserAgents: [
        // Don't throttle request that have 'googlebot' defined in them.
        // Example user agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
        //googlebot/gi,
        // Don't throttle request that have 'bingbot' defined in them.
        // Example user agent: Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)
        new RegExp('bingbot', 'gi')
    ]
});
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply((0, graphql_upload_1.graphqlUploadExpress)({ maxFiles: 10, maxFileSize: 15 * 1000000 })).forRoutes('graphql');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                Configs,
                Throttler,
                GraphQL,
                Sequelize,
                schedule_1.ScheduleModule.forRoot(),
                event_emitter_1.EventEmitterModule.forRoot(),
                websocket_module_1.WebSocketModule,
                user_module_1.UserModule,
                auth_module_1.AuthModule,
                admin_module_1.AdminModule,
                staff_module_1.StaffModule,
                usertodo_module_1.UsertodoModule,
                todo_module_1.TodoModule
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
