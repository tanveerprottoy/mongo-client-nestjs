export default class DbUtils {

    static streamCursorData(cursor: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const docs: any[] = [];
            const stream = cursor.stream();
            stream.on("data", function (doc: any) {
                console.log("stream.on", doc);
                docs.push(doc);
            });
            stream.on("error", function (err: Error) {
                console.log(err);
                reject(err);
            });
            stream.on("end", function () {
                console.log("All done!");
                resolve(docs);
            });
        });
    }
}