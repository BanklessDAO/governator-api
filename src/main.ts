import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/root.module';
import { ConfigService } from '@nestjs/config';
import { configure } from './app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    configure(app);

    await app.listen(app.get(ConfigService).get('API_PORT'));
}
bootstrap();
