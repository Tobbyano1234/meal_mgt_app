import * as dotenv from "dotenv";
dotenv.config()
import { NestFactory } from '@nestjs/core';
// import { NestFactory } from '@nestjs/ng-universal';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Environment } from './common/enums/environment-variables.enum';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
// import { join } from "path";


// createDBFunction()
// const getAllowedOrigins = (environment: Environment) => {
//   //TODO: add origins for staging and production environments

//   if (environment === Environment.DEVELOPMENT) {
//     return ['http://localhost:3000'];
//   }

//   return '*';
// };


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    bufferLogs: true,
  });

  const port = process.env.SERVER_PORT || 3000;
  const environment = process.env.NODE_ENV as Environment;

  app.use(helmet());

  // Setting the node process timezone
  process.env.TZ = 'Africa/Lagos';


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: environment !== Environment.PRODUCTION, // set to true on production
      transform: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      stopAtFirstError: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(validationErrors, 'Bad Request'),
    }),
  );

  // This will prefix our routes with api i.e http://localhost:4000/api/*
  app.setGlobalPrefix('api');

  // We configure the cross origins to allow requests from our frontend
  app.enableCors({
//     origin: getAllowedOrigins(environment),
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

//   app.enableAngularUniversal({
//     viewsPath: join(process.cwd(), 'dist/browser'),
//     bundle: require('../server/main'),
//     liveReload: true
//   });

  await app.listen(port);
}
bootstrap();
