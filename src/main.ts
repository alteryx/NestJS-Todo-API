import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Configures OpenAPI document generation and Swagger UI endpoint */
  const config = new DocumentBuilder()
    .setTitle('Todo Example API')
    .setDescription('Todo API description here')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /* Use class decorators (in DTOs) to enforce and validate data shape */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
