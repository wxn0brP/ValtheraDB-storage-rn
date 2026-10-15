import { CustomFileCpu } from "@wxn0brp/db-core";
import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
import { addIdBulk } from "@wxn0brp/db-core/helpers/addId";
import { hasFieldsAdvanced } from "@wxn0brp/db-core/utils/hasFieldsAdvanced";
import { version } from "./version.js";
export class RNAsyncStorageActions extends CustomActionsBase {
    name;
    _storage;
    version = version;
    capabilities = {
        transactions: false,
        indexes: false,
        persistent: true,
    };
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
    async bulkAdd(config) {
        await this.ensureCollection(config.collection);
        await addIdBulk(config, this);
        const data = await this._read(config.collection);
        data.push(...config.datas);
        await this._write(config.collection, data);
        return config.datas;
    }
    async count(config) {
        const data = await this._read(config.collection);
        if (data.length === 0)
            return 0;
        const { search } = config;
        if (!search || Object.keys(search).length === 0)
            return data.length;
        let count = 0;
        for (const item of data)
            if (hasFieldsAdvanced(item, search))
                count++;
        return count;
    }
}
