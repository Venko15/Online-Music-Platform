import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.enableCors({
    origin: [
      `http://localhost:5000`,
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):5000$/`),
    ],
  });

  await app.listen(3000);
}
bootstrap();
