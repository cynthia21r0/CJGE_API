import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionfilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  //Uso de pipes de forma global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
    }),
  );

  //Uso de filtros globales
  app.useGlobalFilters(new AllExceptionfilter());

  //Configuración de SWAGGER
  const config = new DocumentBuilder()
    .setTitle('API con vulnerabilidades de seguridad')
    .setDescription('Documentación de la API para pruebas')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  //Puerto de escucha
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//? MYSQL
//! npm install mysql2
//! npm install @types/mysql -D

//? POSTGRESQL
//! npm install pg
//! npm install @types/pg -D

//? SWAGGER
//! npm install @nestjs/swagger

//? BYCRIPT
//! npm i bcrypt
//! npm i -D @types/bcrypt