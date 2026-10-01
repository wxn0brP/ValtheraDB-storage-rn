import { ValtheraClass } from "@wxn0brp/db-core";
import { Collection } from "@wxn0brp/db-core/helpers/collection";
import { Data } from "@wxn0brp/db-core/types/data";
import { AsyncStorageLike } from "./async-storage.js";
export * from "./async-storage.js";
export declare function createRNAsyncStorageValthera<T extends Record<string, Data[]>>(name: string, storage: AsyncStorageLike, data?: T): ValtheraClass & {
    [K in keyof T]: Collection<T[K][number]>;
};
