/// <reference path="./../../typings/index.d.ts" />
"use strict";
const mongoose = require("mongoose");
class RepositoryBase {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
        this.initSchemaDefinition();
    }
    initSchemaDefinition() {
        this._schema = this.getSchema();
    }
    createNewEntity() {
        return new (this.getAll())(null);
    }
    getAll() {
        let documentName = this.getDocumentName();
        try {
            return mongoose.model(documentName, this._schema, documentName);
        }
        catch (ex) {
            return mongoose.model(documentName, null, documentName);
        }
    }
}
exports.RepositoryBase = RepositoryBase;
//# sourceMappingURL=repositoryBase.js.map
