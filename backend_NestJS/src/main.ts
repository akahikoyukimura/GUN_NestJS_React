import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove prop not supposed to be in API req
      forbidNonWhitelisted: true, // throw error if unexpected prop added to API req
      transform: true, // tell to transform the value to the expected type (like "1" to 1)
    }),
  );

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
