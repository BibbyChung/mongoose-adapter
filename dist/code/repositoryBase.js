/// <reference path="./../../typings/index.d.ts" />
"use strict";
const mongoose = require("mongoose");
class RepositoryBase {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
        this.initSchemaDefinition();
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
        return this._model;
    }
}
exports.RepositoryBase = RepositoryBase;

//# sourceMappingURL=repositoryBase.js.map
