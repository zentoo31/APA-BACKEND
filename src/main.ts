import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3004', // Reemplaza con la URL de tu frontend
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
