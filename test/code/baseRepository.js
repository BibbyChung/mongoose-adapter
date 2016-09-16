/// <reference path="./../../typings/index.d.ts" />
"use strict";
const mongoose = require("mongoose");
class BaseRepository {
    constructor() {
        this.initSchemaDefinition();
    }
    set unitOfWork(value) {
        this._unitOfWork = value;
    }
    get unitOfWork() {
        return this._unitOfWork;
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
    add(entity) {
        this._unitOfWork.add(entity);
    }
    remove(entity) {
        this._unitOfWork.remove(entity);
    }
    update(entity) {
        this._unitOfWork.update(entity);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map
