import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
import { VQueryT } from "@wxn0brp/db-core/types/query";
export interface AsyncStorageLike {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    getAllKeys(): Promise<readonly string[]>;
}
export declare class RNAsyncStorageActions extends CustomActionsBase {
    name: string;
    _storage: AsyncStorageLike;
    version: string;
    capabilities: {
        transactions: boolean;
        indexes: boolean;
        persistent: boolean;
    };
    constructor(name: string, _storage: AsyncStorageLike);
    _getPath(collection: string): string;
    _read(collection: string): Promise<any>;
    _write(collection: string, data: object[]): Promise<void>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    getCollections(): Promise<string[]>;
    removeCollection(collection: string): Promise<boolean>;
    bulkAdd(config: VQueryT.BulkAdd): Promise<import("@wxn0brp/db-core/types/arg").Arg<import("@wxn0brp/db-core/types/data").Data>[]>;
    count(config: VQueryT.Count): Promise<number>;
}
