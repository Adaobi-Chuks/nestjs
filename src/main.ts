import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Apply validation pipe to application
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Blog API Documentation")
    .setDescription("Use this documentation to understand how to interact with the API. Use the base API URL as http://localhost:3000")
    .setTermsOfService("http://localhost:3000/terms-of-service")
    .setLicense(
      "MIT License",
      "http://www.opensource.org/licenses/mit-license.html")
    .setVersion("1.0")
    .addServer("http://localhost:3000")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion')
  })

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();