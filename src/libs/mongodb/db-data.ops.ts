import { BulkWriteOptions, DeleteOptions, DeleteResult, Document, Filter, FindCursor, FindOptions, InsertManyResult, InsertOneOptions, InsertOneResult, OptionalUnlessRequiredId, UpdateFilter, UpdateOptions, UpdateResult, WithId } from "mongodb";
import { DbClientInstance } from "./db.client";

class DbDataOps {
    private static instance: DbDataOps;

    private constructor() {
        console.log("DbDataOps init");
        if(DbDataOps.instance) {
            throw new Error("Error - already initialized");
        }
    }

    /**
     * @param name - the collection name.
     */
    async insertOne<T>(
        name: string,
        doc: OptionalUnlessRequiredId<T>,
        options?: InsertOneOptions
    ): Promise<InsertOneResult<T> | Error> {
        try {
            const collection = DbClientInstance.db.collection<T>(
                name
            );
            if(!options) {
                return collection.insertOne(
                    doc
                );
            }
            else {
                return collection.insertOne(
                    doc,
                    options
                );
            }
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    /**
     * @param name - the collection name.
     */
    async insertMany<T>(
        name: string,
        docs: OptionalUnlessRequiredId<T>[],
        options?: BulkWriteOptions
    ): Promise<InsertManyResult<T> | Error> {
        try {
            const collection = DbClientInstance.db.collection<T>(
                name
            );
            if(!options) {
                return collection.insertMany(
                    docs
                );
            }
            else {
                return collection.insertMany(
                    docs,
                    options
                );
            }
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    /**
     * @param name - the collection name.
     */
    findAll<T>(
        name: string
    ): FindCursor<WithId<T>> | Error {
        try {
            const cursor = DbClientInstance.db.collection<T>(
                name
            ).find();
            console.log(cursor);
            return cursor;
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    /**
     * @param name - the collection name.
     */
    find<T>(
        name: string,
        filter?: Filter<T>,
        options?: FindOptions
    ): FindCursor<WithId<T>> | Error {
        try {
            return DbClientInstance.db.collection<T>(
                name
            ).find(
                filter,
                options
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    /**
     * @param name - the collection name.
     */
    async findOne<T>(
        name: string,
        filter?: Filter<T>,
        options?: FindOptions
    ): Promise<WithId<T> | null | Error> {
        try {
            return await DbClientInstance.db.collection<T>(
                name
            ).findOne(
                filter,
                options
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    /**
     * @param name - the collection name.
     */
    async updateOne<T>(
        name: string,
        filter: Filter<T>,
        update: UpdateFilter<T> | Partial<T>,
        options?: UpdateOptions
    ): Promise<UpdateResult | Error> {
        try {
            const collection = DbClientInstance.db.collection<T>(
                name
            );
            if(!options) {
                return collection.updateOne(
                    filter,
                    update
                );
            }
            else {
                return collection.updateOne(
                    filter,
                    update,
                    options
                );
            }
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    /**
     * @param name - the collection name.
     */
    async updateMany<T>(
        name: string,
        filter: Filter<T>,
        update: UpdateFilter<T>,
        options?: UpdateOptions
    ): Promise<UpdateResult | Document | Error> {
        try {
            const collection = DbClientInstance.db.collection<T>(
                name
            );
            if(!options) {
                return collection.updateMany(
                    filter,
                    update
                );
            }
            else {
                return collection.updateMany(
                    filter,
                    update,
                    options
                );
            }
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    /**
     * @param name - the collection name.
     */
    async deleteOne<T>(
        name: string,
        filter: Filter<T>,
        options?: DeleteOptions
    ): Promise<Promise<DeleteResult> | Error> {
        try {
            return await DbClientInstance.db.collection<T>(
                name
            ).deleteOne(
                filter,
                options
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    /**
     * @param name - the collection name.
     */
    async deleteMany<T>(
        name: string,
        filter: Filter<T>,
        options?: DeleteOptions
    ): Promise<Promise<DeleteResult> | Error> {
        try {
            return await DbClientInstance.db.collection<T>(
                name
            ).deleteMany(
                filter,
                options
            );
        }
        catch(e) {
            console.error(e);
            return e;
        }
    }

    static getInstance(): DbDataOps {
        DbDataOps.instance = DbDataOps.instance || new DbDataOps();
        return DbDataOps.instance;
    }
}

export const DbDataOpsInstance = DbDataOps.getInstance();