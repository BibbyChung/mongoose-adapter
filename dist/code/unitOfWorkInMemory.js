"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let mockgoose = require("mockgoose");
class UnitOfWorkInMemory {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
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
    saveChangeAsync() {
        return this.unitOfWork.saveChangeAsync();
    }
    connectAsync() {
        let p = new Promise((resolve, reject) => {
            mockgoose(mongoose).then(() => __awaiter(this, void 0, void 0, function* () {
                yield this.unitOfWork.connectAsync("xxx");
                resolve();
            }));
        });
        return p;
    }
    closeAsync() {
        let p = new Promise((resolve, reject) => {
            mockgoose.reset(() => __awaiter(this, void 0, void 0, function* () {
                yield this.unitOfWork.closeAsync();
                resolve();
            }));
        });
        return p;
    }
    resetAsync() {
        let p = new Promise((resolve, reject) => {
            mockgoose.reset(() => {
                resolve();
            });
        });
        return p;
    }
}
exports.UnitOfWorkInMemory = UnitOfWorkInMemory;
//# sourceMappingURL=unitOfWorkInMemory.js.map
