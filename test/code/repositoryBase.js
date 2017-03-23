"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class RepositoryBase {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    initSchemaDefinition() {
        let collectionName = this.getCollectionName();
        try {
            this._model = mongoose.model(collectionName, this.getSchema(), collectionName);
        }
        catch (ex) {
            this._model = mongoose.model(collectionName, null, collectionName);
        }
    }
    createNewEntity() {
        return new (this.getAll())(null);
    }
    getAll() {
        if (this._model == undefined)
            this.initSchemaDefinition();
        return this._model;
    }
}
exports.RepositoryBase = RepositoryBase;

//# sourceMappingURL=repositoryBase.js.map
