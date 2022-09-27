import { Db, MongoClient } from "mongodb";
import { ErrorUtils } from "../../utils/error.utils";

class DbClient {
    private static instance: DbClient;
    client: MongoClient;
    db: Db;

    private constructor() {
        console.log("DbClient init");
        if(DbClient.instance) {
            ErrorUtils.throwError(
                new Error("Error - already initialized")
            );
        }
    }

    /**
     * @param uri - mongodb uri.
     * @param name - the db name.
     */
    async init(
        uri: string,
        name: string
    ) {
        try {
            this.client = new MongoClient(uri);
            // Connect the client to the server
            await this.client.connect();
            this.db = this.client.db(name);
            // Establish and verify connection
            await this.db.command({ ping: 1 });
            console.log("Connected successfully to db");
        }
        catch(e) {
            this.close();
            ErrorUtils.throwError(e);
        }
    }

    close() {
        this.client.close();
    }

    static getInstance(): DbClient {
        DbClient.instance = DbClient.instance || new DbClient();
        return DbClient.instance;
    }
}

export const DbClientInstance = DbClient.getInstance();