/// <reference path="./../../typings/index.d.ts" />
"use strict";
var mongoose = require("mongoose");
var BaseRepository = (function () {
    function BaseRepository(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    BaseRepository.prototype.createNewEntity = function () {
        return new (this.getAll())(null);
    };
    BaseRepository.prototype.getAll = function () {
        var documentName = this.getDocumentName();
        var schema = this.getSchema();
        try {
            return mongoose.model(documentName, schema, documentName);
        }
        catch (ex) {
            return mongoose.model(documentName, null, documentName);
        }
    };
    BaseRepository.prototype.add = function (entity) {
        this.unitOfWork.add(entity);
    };
    BaseRepository.prototype.remove = function (entity) {
        this.unitOfWork.remove(entity);
    };
    BaseRepository.prototype.update = function (entity) {
        this.unitOfWork.update(entity);
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map
