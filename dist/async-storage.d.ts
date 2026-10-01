import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
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
    constructor(name: string, _storage: AsyncStorageLike);
    _getPath(collection: string): string;
    _read(collection: string): Promise<any>;
    _write(collection: string, data: object[]): Promise<void>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    getCollections(): Promise<string[]>;
    removeCollection(collection: string): Promise<boolean>;
}
