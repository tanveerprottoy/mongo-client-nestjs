import { Collection, CollectionInfo, CreateCollectionOptions, Document, IndexSpecification, ListCollectionsCursor, ListCollectionsOptions, ListDatabasesResult } from "mongodb";
import { ErrorUtils } from "../../utils/error.utils";
import { DbClientInstance } from "./db.client";

class DbControlOps {
    private static instance: DbControlOps;

    private constructor() {
        console.log("DbControlOps init");
        if(DbControlOps.instance) {
            ErrorUtils.throwError(
                new Error("Error - already initialized")
            );
        }
    }

    async listDatabases(): Promise<ListDatabasesResult | Error> {
        try {
            return await DbClientInstance.db.admin().listDatabases();
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    /**
     * @param name - the collection name.
     */
    async createCollection<T>(
        name: string,
        options?: CreateCollectionOptions
    ): Promise<Collection<T> | Error> {
        try {
            return await DbClientInstance.db.createCollection<T>(
                name,
                options
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    /**
     * @param name - the collection name.
     */
    async createIndex(
        name: string,
        indexSpec: IndexSpecification
    ): Promise<string | Error> {
        try {
            return await DbClientInstance.db.createIndex(
                name,
                indexSpec
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    listCollections(
        filter?: Document,
        options?: ListCollectionsOptions
    ): ListCollectionsCursor<Pick<CollectionInfo, 'name' | 'type'>> | Error {
        try {
            return DbClientInstance.db.listCollections(
                filter,
                options
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    /**
     * @param name - the collection name.
     */
    async dropCollection(
        name: string
    ): Promise<boolean | Error> {
        try {
            return await DbClientInstance.db.dropCollection(
                name
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    /**
     * @param name - the collection name.
     */
    async validateCollection(
        name: string
    ): Promise<Document | Error> {
        try {
            return await DbClientInstance.db.admin().validateCollection(
                name
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    static getInstance(): DbControlOps {
        DbControlOps.instance = DbControlOps.instance || new DbControlOps();
        return DbControlOps.instance;
    }
}

export const DbControlOpsInstance = DbControlOps.getInstance();