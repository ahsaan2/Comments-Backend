// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Enable CORS - Allow All Origins
  app.enableCors({
    origin: '*',
    methods: ['*'],
    credentials: false
  });
  await app.listen(3001);
}
bootstrap();
