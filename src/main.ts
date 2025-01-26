import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import { SwaggerConfigService } from "./swagger-config/swagger-config.service";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  // Determine the environment to configure logging level
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.STAGE === "prod"
        ? ["error", "warn"] // Only show error and warning logs in production
        : ["log", "warn", "debug", "verbose", "error"], // Show all logs in other environments
  });

  const swaggerService = app.get(SwaggerConfigService); // Inject the SwaggerService
  swaggerService.createDocument(app); // Call the createDocument method

  // Enable validation at app level (globally)
  app.useGlobalPipes(new ValidationPipe());

  // Enable interceptor at app level (globally)
  app.useGlobalInterceptors(new TransformInterceptor());

  // enable cors for all servers
  app.enableCors({
    origin: "https://task-management-app-1-eozh.onrender.com/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept, Authorization",
    credentials: true,
    preflightContinue: true,
  });

  // Start the app
  await app.listen(PORT);

  // Log the server status only if not in production (controlled by environment)
  if (process.env.STAGE !== "prod") {
    logger.log(`Server running on port ${PORT}`);
  }
}

bootstrap();
