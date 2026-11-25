import { forgeTypedValthera, ValtheraClass } from "@wxn0brp/db-core";
import { RNAsyncStorageActions } from "./async-storage.js";
export * from "./async-storage.js";
export async function createRNAsyncStorageValthera(name, storage, data) {
    const db = new ValtheraClass({
        adapter: new RNAsyncStorageActions(name, storage),
    });
    if (!data)
        return forgeTypedValthera(db);
    const adapter = db.adapter;
    await Promise.all(Object.keys(data).map(collection => adapter._write(collection, data[collection])));
    return forgeTypedValthera(db);
}
