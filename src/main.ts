import { VersioningType } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { Constants } from "./constants";
import { AppModule } from './app.module';
import { DbControlOpsInstance } from "./libs/db-control.ops";
import { DbDataOpsInstance } from "./libs/db-data.ops";
import { DbClientInstance } from "./libs/db.client";

async function createCollection() {
    DbControlOpsInstance.createCollection(
        Constants.COLLECTION_NAME
    );
}

async function insertData() {
    DbDataOpsInstance.insertOne(
        Constants.COLLECTION_NAME,
        {
            name: "Name 1",
            email: "user1@mail.com",
        }
    );
    DbDataOpsInstance.insertMany(
        Constants.COLLECTION_NAME,
        [
            {
                name: "Name 2",
                email: "user2@mail.com",
            },
            {
                name: "Name 3",
                email: "user3@mail.com",
            },
        ]
    );
}

async function bootstrap() {
    await DbClientInstance.init(
        "mongodb://localhost:27017", // "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
        "mongo_nest"
    );
    // await createCollection();
    await insertData();
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(Constants.API);
    app.enableVersioning({
        type: VersioningType.URI,
    });
    await app.listen(3000);
}
bootstrap();
