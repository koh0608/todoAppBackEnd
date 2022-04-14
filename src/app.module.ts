import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { graphqlUploadExpress } from 'graphql-upload';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule as NestSchedule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import envSchema from '@configs/env.config';


// Modules
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { StaffModule } from './modules/staff/staff.module';
import { WebSocketModule } from './modules/websocket/websocket.module';
import { isProduction } from '@configs/app.config';
import { origins } from '@configs/app.config';
import { UsertodoModule } from './modules/usertodo/usertodo.module';
import { TodoModule } from './modules/todo/todo.module';

const Configs = ConfigModule.forRoot({
  envFilePath: ['.env'],
  isGlobal: true,
  validationSchema: envSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true
  }
});

const GraphQL = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true,
  sortSchema: true,
  introspection: !isProduction,
  cors: {
    credentials: true,
    origin: (origin: any, callback: any) => {
      if (!origin || origins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        if (process.env.CORS_VALIDATION === 'true') {
          callback(new Error('Not allowed by CORS'));
        } else {
          callback(null, true);
        }
      }
    }
  }
});

const Sequelize = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: process.env['DB_HOST'],
  port: 3306,
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  autoLoadModels: true,
  synchronize: false,
  logging: !isProduction
});

const Throttler = ThrottlerModule.forRoot({
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

@Module({
  imports: [
    Configs,
    Throttler,
    GraphQL,
    Sequelize,
    NestSchedule.forRoot(),
    EventEmitterModule.forRoot(),
    WebSocketModule,
    UserModule,
    AuthModule,
    AdminModule,
    StaffModule,
    UsertodoModule,
    TodoModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress({ maxFiles: 10, maxFileSize: 15 * 1000000 })).forRoutes('graphql');
  }
}
