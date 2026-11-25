import { ValtheraClass } from "@wxn0brp/db-core";
import { Data } from "@wxn0brp/db-core/types/data";
import { TypedValthera } from "@wxn0brp/db-core/types/typed";
import { AsyncStorageLike } from "./async-storage.js";
export * from "./async-storage.js";
export declare function createRNAsyncStorageValthera<T extends Record<string, Data[]>>(name: string, storage: AsyncStorageLike, data?: T): Promise<TypedValthera<T, ValtheraClass>>;
