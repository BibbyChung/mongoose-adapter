/// <reference path="./../../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
var UnitOfWorkInMemory = (function () {
    function UnitOfWorkInMemory(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    UnitOfWorkInMemory.prototype.add = function (entity) {
        this.unitOfWork.add(entity);
    };
    UnitOfWorkInMemory.prototype.remove = function (entity) {
        this.unitOfWork.remove(entity);
    };
    UnitOfWorkInMemory.prototype.update = function (entity) {
        this.unitOfWork.update(entity);
    };
    UnitOfWorkInMemory.prototype.saveChangeAsync = function () {
        return this.unitOfWork.saveChangeAsync();
    };
    UnitOfWorkInMemory.prototype.connectAsync = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            mockgoose(mongoose).then(function () __awaiter(this, void 0, void 0, function* () {
                yield _this.unitOfWork.connectAsync("xxx");
                resolve();
            }));
        });
        return p;
    };
    UnitOfWorkInMemory.prototype.closeAsync = function () {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            mockgoose.reset(function () __awaiter(this, void 0, void 0, function* () {
                yield _this.unitOfWork.closeAsync();
                resolve();
            }));
        });
        return p;
    };
    UnitOfWorkInMemory.prototype.resetAsync = function () {
        var p = new Promise(function (resolve, reject) {
            mockgoose.reset(function () {
                resolve();
            });
        });
        return p;
    };
    return UnitOfWorkInMemory;
}());
exports.UnitOfWorkInMemory = UnitOfWorkInMemory;

//# sourceMappingURL=unitOfWorkInMemory.js.map
