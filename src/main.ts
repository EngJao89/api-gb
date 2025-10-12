import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://192.168.100.11:8081'];
  
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new LogInterceptor());

  const port = process.env.PORT || 3333;
  await app.listen(port);
}
bootstrap();
