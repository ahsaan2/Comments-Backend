import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { CorsOptions } from "cors";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}

bootstrap();
