import { Injectable } from '@nestjs/common';
import { FindCursor, WithId } from "mongodb";
import { Constants } from "./constants";
import { DbDataOpsInstance } from "./libs/mongodb";
import DbUtils from "./libs/mongodb/db.utils";

@Injectable()
export class AppService {

    async getData() {
        const cursor = DbDataOpsInstance.findAll<any>(
            Constants.COLLECTION_NAME
        ) as FindCursor<WithId<any>>;
        // Execute the each command, triggers for each document
        cursor.forEach((doc) => {
            if(doc == null) {
                return;
            }
            console.log("cursor.forEach", doc);
        });
        const docs = await DbUtils.streamCursorData(cursor);
        return cursor.toArray();
    }

    async getDataByYearMonth(
        year: number,
        month: number
    ) {
        const cursor = DbDataOpsInstance.find<any>(
            Constants.COLLECTION_NAME,
            {
                $expr: {
                    $and: [
                        {
                            $eq: [
                                {
                                    $year: "$createdAt"
                                },
                                year
                            ]
                        },
                        {
                            $eq:
                                [
                                    {
                                        $month: "$createdAt"
                                    },
                                    month
                                ]
                        }
                    ]
                }
            }
        ) as FindCursor<WithId<any>>;
        return cursor.toArray();
    }
}
