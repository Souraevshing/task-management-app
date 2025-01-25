import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class SwaggerConfigService {
  constructor(private readonly configService: ConfigService) {}

  createDocument(app: any): void {
    const options = new DocumentBuilder()
      .setTitle("Task Management")
      .setDescription(
        `RESTful API developed using Nest.js for exposing apis to be consumed by frontend.\n Also implemented Swagger for API documentation to execute all APIs using GUI.\n Implemented user authentication and authorization to perform all CRUD operations only for authenticated users.`
      )
      .setVersion("1.0.0")
      .setContact(
        "Sourav Kumar",
        "https://sauraevshing-portfolio.netlify.app/",
        "isauravshing@gmail.com"
      )
      .addBearerAuth()
      .addServer("http://localhost:3000", "Development Server")
      .addServer(
        "https://task-management-api-dev.herokuapp.com",
        "Production Server"
      )
      .addSecurityRequirements("bearer")
      .addTag("Users", "Endpoints related to Users")
      .addTag("Tasks", "Endpoints related to Tasks")
      .setLicense(
        "Apache 2.0",
        "https://www.apache.org/licenses/LICENSE-2.0.html"
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api.dev.task-management", app, document);
  }
}
