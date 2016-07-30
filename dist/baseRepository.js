/// <reference path="./../../typings/index.d.ts" />
"use strict";
const mongoose = require("mongoose");
class BaseRepository {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    createNewEntity() {
        return new (this.getAll())(null);
    }
    getAll() {
        let documentName = this.getDocumentName();
        let schema = this.getSchema();
        try {
            return mongoose.model(documentName, schema, documentName);
        }
        catch (ex) {
            return mongoose.model(documentName, null, documentName);
        }
    }
    add(entity) {
        this.unitOfWork.add(entity);
    }
    remove(entity) {
        this.unitOfWork.remove(entity);
    }
    update(entity) {
        this.unitOfWork.update(entity);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map
