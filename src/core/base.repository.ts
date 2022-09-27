export abstract class BaseRepository<T> {

    async handleCursor(
        cursor: any
    ): Promise<any> {
        new Promise<any>((resolve, reject) => {
            try {
                const data: any[] = [];
                const stream = cursor.stream();
                stream.on("data", function (doc) {
                    console.log("stream.on", doc);
                    data.push(doc);
                });
                stream.on("error", function (err) {
                    console.log(err);
                    reject(err);
                });
                stream.on("end", function () {
                    console.log("All done!");
                    resolve(data);
                });
            }
            catch(e) {
                console.error(e);
                reject(e);
            }
        });
    }

    abstract create(t: T): Promise<any>

    abstract find(
        filter?: object,
        options?: object
    ): Promise<any>

    abstract findOne(
        filter?: object,
        options?: object
    ): Promise<any>

    abstract update(
        filter: any,
        update: any
    ): Promise<any>

    abstract deleteOne(
        filter: any,
    ): Promise<any>
}