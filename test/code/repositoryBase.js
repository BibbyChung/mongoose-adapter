"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class RepositoryBase {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    initSchemaDefinition() {
        const collectionName = this.getCollectionName();
        try {
            this.model = mongoose.model(collectionName, this.getSchema(), collectionName);
        }
        catch (ex) {
            this.model = mongoose.model(collectionName, null, collectionName);
        }
    }
    createNewEntity() {
        return new (this.getAll())(null);
    }
    getAll() {
        if (this.model === undefined)
            this.initSchemaDefinition();
        return this.model;
    }
}
exports.RepositoryBase = RepositoryBase;
//# sourceMappingURL=repositoryBase.js.map
