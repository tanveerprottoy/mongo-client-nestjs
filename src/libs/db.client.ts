import { Db, MongoClient } from "mongodb";

class DbClient {
    private static instance: DbClient;
    client: MongoClient;
    db: Db;

    private constructor() {
        console.log("DbClient init");
        if(DbClient.instance) {
            throw new Error("Error - already initialized");
        }
    }

    async init(
        uri: string, // db uri "mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
        name: string // db name
    ) {
        try {
            this.client = new MongoClient(uri);
            // Connect the client to the server
            await this.client.connect();
            this.db = this.client.db(name);
            // Establish and verify connection
            await this.db.command({ ping: 1 });
            console.log("Connected successfully to server");
        }
        catch(e) {
            console.error(e);
        }
        finally {
            // Ensures that the client will close when you finish/error
            // await this.mongoClient.close();
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