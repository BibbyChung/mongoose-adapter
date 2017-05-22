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
class UnitOfWorkBase {
    constructor() {
        this.addArr = [];
        this.removeArr = [];
        this.updateArr = [];
    }
    add(entity) {
        this.addArr.push(entity);
    }
    remove(entity) {
        this.removeArr.push(entity);
    }
    update(entity) {
        this.updateArr.push(entity);
    }
    saveChangeAsync() {
        const promiseArr = [];
        this.addArr.forEach((a) => {
            const p = new Promise((resolve, reject) => {
                a.save((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
            promiseArr.push(p);
        });
        this.removeArr.forEach((a) => {
            const p = new Promise((resolve, reject) => {
                a.remove((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
            promiseArr.push(p);
        });
        this.updateArr.forEach((a) => {
            const p = new Promise((resolve, reject) => {
                a.save((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
            promiseArr.push(p);
        });
        const p = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                for (const item of promiseArr) {
                    yield item;
                }
                resolve();
            }
            catch (err) {
                reject(err);
            }
        }));
        return p;
    }
    connectAsync(connectionString) {
        mongoose.Promise = global.Promise;
        const p = new Promise((resolve, reject) => {
            mongoose.connect(connectionString, {
                server: {
                    poolSize: 5,
                },
            }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                // console.log("success to connect the db..")
                resolve();
            });
        });
        return p;
    }
    closeAsync() {
        const p = new Promise((resolve, reject) => {
            mongoose.disconnect((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
        return p;
    }
}
exports.UnitOfWorkBase = UnitOfWorkBase;
//# sourceMappingURL=unitOfWorkBase.js.map
