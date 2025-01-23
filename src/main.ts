import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { TransformInterceptor } from "./interceptors/transform.interceptor";

import { AppModule } from "./app.module";
import { SwaggerConfigService } from "./swagger-config/swagger-config.service";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  // creating Logger object to log info
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const swaggerService = app.get(SwaggerConfigService); // Inject the SwaggerService
  swaggerService.createDocument(app); // Call the createDocument method

  // enable validation at app level (globally)
  app.useGlobalPipes(new ValidationPipe());

  // enable interceptor at app level (globally) to
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(PORT);

  logger.log(`Server running on port ${PORT}`);
}
bootstrap();
