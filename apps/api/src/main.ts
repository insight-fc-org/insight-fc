import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Insight FC API')
    .setVersion('0.1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, doc);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
