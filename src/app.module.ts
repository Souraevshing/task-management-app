import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { validationSchema } from "config.schema";
import { AuthModule } from "./auth/auth.module";
import { Swagger } from "./swagger-config/swagger-config.module";
import { SwaggerConfigService } from "./swagger-config/swagger-config.service";
import { TasksModule } from "./tasks/tasks.module";

// passing orm metadata at root level to use db to perform CRUD operations
// configuring env variables STAGE DEV QA for file .env.${ENV_VARIABLE}
// load env variable and set metadata for db using ConfigService.get() to set from .env.stage.${filename} file
@Module({
  imports: [
    Swagger,
    AuthModule,
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
      expandVariables: true,
      validationSchema,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          applicationName: "task-management",
          type: "postgres",
          host: configService.getOrThrow<string>("DB_HOST", "localhost"),
          port: configService.getOrThrow<number>("DB_PORT", 5432),
          username: configService.getOrThrow<string>("DB_USERNAME"),
          password: configService.getOrThrow<string>("DB_PASSWORD"),
          database: configService.getOrThrow<string>("DB_DATABASE"),
          autoLoadEntities: true,
          synchronize: false,
          ssl: { rejectUnauthorized: false },
          cache: {
            type: "database",
          },
          logger: "advanced-console",
          retryDelay: 5000,
          retryAttempts: 5,
          maxQueryExecutionTime: 1000,
        };
      },
    }),
  ],
  providers: [SwaggerConfigService],
})
export class AppModule {}
