/// <reference path="./../../typings/index.d.ts" />
"use strict";
const mongoose = require("mongoose");
class RepositoryBase {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
        this.initSchemaDefinition();
    }
    initSchemaDefinition() {
        let documentName = this.getDocumentName();
        try {
            this._model = mongoose.model(documentName, this.getSchema(), documentName);
        }
        catch (ex) {
            this._model = mongoose.model(documentName, null, documentName);
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
