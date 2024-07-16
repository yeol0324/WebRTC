import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Next.js 클라이언트의 주소
    methods: '*',
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();
