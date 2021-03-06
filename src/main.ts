import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
// import { LoggingInterceptor } from './interceptors/logging.interceptor';
// import { RolesGuard } from './guards/roles.guard';
// import { RolesGuard } from './guards/roles.guard';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
import { logger } from './middleware/logger.middleware';
// import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);

  // app.useGlobalFilters(new HttpExceptionFilter());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalGuards(new RolesGuard());

  // app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);
}
bootstrap();
