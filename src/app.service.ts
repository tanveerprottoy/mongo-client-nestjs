import { Injectable } from '@nestjs/common';
import { FindCursor, WithId } from "mongodb";
import { Constants } from "./constants";
import { DbDataOpsInstance } from "./libs/db-data.ops";

@Injectable()
export class AppService {

    async getData() {
        const cursor = DbDataOpsInstance.findAll<any>(
            Constants.COLLECTION_NAME
        ) as FindCursor<WithId<any>> ;
        // Execute the each command, triggers for each document
        cursor.forEach((doc) => {
            if(doc == null) {
                return;
            }
            console.log("cursor.forEach", doc);
        });
        const stream = cursor.stream();
        stream.on("data", function (doc) {
            console.log("stream.on", doc);
        });
        stream.on("error", function (err) {
            console.log(err);
        });
        stream.on("end", function () {
            console.log("All done!");
        });
        return cursor.toArray();
    }
}
