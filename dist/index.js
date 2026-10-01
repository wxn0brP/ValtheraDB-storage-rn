import { forgeTypedValthera, ValtheraClass } from "@wxn0brp/db-core";
import { RNAsyncStorageActions } from "./async-storage.js";
export * from "./async-storage.js";
export function createRNAsyncStorageValthera(name, storage, data) {
    const db = new ValtheraClass({
        adapter: new RNAsyncStorageActions(name, storage),
    });
    if (!data)
        return forgeTypedValthera(db);
    for (const collection of Object.keys(data)) {
        db.adapter._write(collection, data[collection]);
    }
    return forgeTypedValthera(db);
}
