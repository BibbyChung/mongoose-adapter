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
const mockgoose_1 = require("mockgoose");
let mockgoose = new mockgoose_1.Mockgoose(mongoose);
class UnitOfWorkInMemory {
    constructor(unitOfWork) {
        this.unitOfWork = unitOfWork;
    }
    static initPrepareStorageAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mockgoose.prepareStorage();
        });
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
        return __awaiter(this, void 0, void 0, function* () {
            yield mockgoose.prepareStorage();
            yield this.unitOfWork.connectAsync("xxx");
        });
    }
    closeAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mockgoose.helper.reset();
            yield this.unitOfWork.closeAsync();
        });
    }
    resetAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mockgoose.helper.reset();
        });
    }
}
exports.UnitOfWorkInMemory = UnitOfWorkInMemory;
//# sourceMappingURL=unitOfWorkInMemory.js.map
