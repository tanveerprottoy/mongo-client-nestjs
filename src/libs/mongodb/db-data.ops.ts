import { BulkWriteOptions, DeleteOptions, DeleteResult, Document, Filter, FindCursor, FindOptions, InsertManyResult, InsertOneOptions, InsertOneResult, OptionalUnlessRequiredId, UpdateFilter, UpdateOptions, UpdateResult, WithId } from "mongodb";
import { ErrorUtils } from "../../utils/error.utils";
import { DbClientInstance } from "./db.client";

class DbDataOps {
    private static instance: DbDataOps;

    private constructor() {
        console.log("DbDataOps init");
        if(DbDataOps.instance) {
            ErrorUtils.throwError(
                new Error("Error - already initialized")
            );
        }
    }

    async insertOne<T extends Document>(
        collectionName: string,
        doc: OptionalUnlessRequiredId<T>,
        options?: InsertOneOptions
    ): Promise<InsertOneResult<T>> {
        try {
            const collection = DbClientInstance.db.collection<T>(
                collectionName
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
            ErrorUtils.throwError(e);
        }
    }

    async insertMany<T extends Document>(
        collectionName: string,
        docs: OptionalUnlessRequiredId<T>[],
        options?: BulkWriteOptions
    ): Promise<InsertManyResult<T>> {
        try {
            const collection = DbClientInstance.db.collection<T>(
                collectionName
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
            ErrorUtils.throwError(e);
        }
    }

    findAll<T extends Document>(
        collectionName: string
    ): FindCursor<WithId<T>> {
        try {
            return DbClientInstance.db.collection<T>(
                collectionName
            ).find();
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    find<T extends Document>(
        collectionName: string,
        filter: Filter<T>,
        options?: FindOptions
    ): FindCursor<WithId<T>> {
        try {
            return DbClientInstance.db.collection<T>(
                collectionName
            ).find(
                filter,
                options
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    async findOne<T extends Document>(
        collectionName: string,
        filter: Filter<T>,
        options?: FindOptions
    ): Promise<WithId<T>> {
        try {
            return await DbClientInstance.db.collection<T>(
                collectionName
            ).findOne(
                filter,
                options
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    async updateOne<T extends Document>(
        collectionName: string,
        filter: Filter<T>,
        update: UpdateFilter<T> | Partial<T>,
        options?: UpdateOptions
    ): Promise<UpdateResult> {
        try {
            const collection = DbClientInstance.db.collection<T>(
                collectionName
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
            ErrorUtils.throwError(e);
        }
    }

    async updateMany<T extends Document>(
        collectionName: string,
        filter: Filter<T>,
        update: UpdateFilter<T>,
        options?: UpdateOptions
    ): Promise<UpdateResult | Document> {
        try {
            const collection = DbClientInstance.db.collection<T>(
                collectionName
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
            ErrorUtils.throwError(e);
        }
    }

    async deleteOne<T extends Document>(
        collectionName: string,
        filter: Filter<T>,
        options: DeleteOptions
    ): Promise<DeleteResult> {
        try {
            return DbClientInstance.db.collection<T>(
                collectionName
            ).deleteOne(
                filter,
                options
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    async deleteMany<T extends Document>(
        collectionName: string,
        filter: Filter<T>,
        options: DeleteOptions
    ): Promise<DeleteResult> {
        try {
            return await DbClientInstance.db.collection<T>(
                collectionName
            ).deleteMany(
                filter,
                options
            );
        }
        catch(e) {
            ErrorUtils.throwError(e);
        }
    }

    static getInstance(): DbDataOps {
        DbDataOps.instance = DbDataOps.instance || new DbDataOps();
        return DbDataOps.instance;
    }
}

export const DbDataOpsInstance = DbDataOps.getInstance();