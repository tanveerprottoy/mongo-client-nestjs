import { VersioningType } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { Constants } from "../constants";
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(Constants.API);
    app.enableVersioning({
        type: VersioningType.URI,
    });
    await app.listen(3000);
}
bootstrap();
