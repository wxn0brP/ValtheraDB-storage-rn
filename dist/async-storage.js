import { CustomFileCpu } from "@wxn0brp/db-core";
import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
import { version } from "./version.js";
export class RNAsyncStorageActions extends CustomActionsBase {
    name;
    _storage;
    version = version;
    constructor(name, _storage) {
        super();
        this.name = name;
        this._storage = _storage;
        this.fileCpu = new CustomFileCpu(this._read.bind(this), this._write.bind(this));
    }
    _getPath(collection) {
        return "vdb_" + this.name + "_" + collection;
    }
    async _read(collection) {
        const data = await this._storage.getItem(this._getPath(collection));
        return data ? JSON.parse(data) : [];
    }
    async _write(collection, data) {
        await this._storage.setItem(this._getPath(collection), JSON.stringify(data));
    }
    async ensureCollection(collection) {
        const key = this._getPath(collection);
        const existing = await this._storage.getItem(key);
        if (existing === null) {
            await this._storage.setItem(key, JSON.stringify([]));
        }
        return true;
    }
    async issetCollection(collection) {
        const data = await this._storage.getItem(this._getPath(collection));
        return data !== null;
    }
    async getCollections() {
        const keys = await this._storage.getAllKeys();
        const prefix = "vdb_" + this.name + "_";
        return keys
            .filter(key => key.startsWith(prefix))
            .map(key => key.replace(prefix, ""));
    }
    async removeCollection(collection) {
        await this._storage.removeItem(this._getPath(collection));
        return true;
    }
}
