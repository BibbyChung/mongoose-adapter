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
var UnitOfWork = (function () {
    function UnitOfWork() {
        this.addArr = [];
        this.removeArr = [];
        this.updateArr = [];
    }
    UnitOfWork.prototype.add = function (entity) {
        this.addArr.push(entity);
    };
    UnitOfWork.prototype.remove = function (entity) {
        this.removeArr.push(entity);
    };
    UnitOfWork.prototype.update = function (entity) {
        this.updateArr.push(entity);
    };
    UnitOfWork.prototype.saveChangeAsync = function () {
        var promiseArr = [];
        this.addArr.forEach(function (a) {
            var p = new Promise(function (resolve, reject) {
                a.save(function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
            promiseArr.push(p);
        });
        this.removeArr.forEach(function (a) {
            var p = new Promise(function (resolve, reject) {
                a.remove(function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
            promiseArr.push(p);
        });
        this.updateArr.forEach(function (a) {
            var p = new Promise(function (resolve, reject) {
                a.save(function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
            promiseArr.push(p);
        });
        var p = new Promise(function (resolve, reject) __awaiter(this, void 0, void 0, function* () {
            try {
                for (var _i = 0, promiseArr_1 = promiseArr; _i < promiseArr_1.length; _i++) {
                    var item = promiseArr_1[_i];
                    yield item;
                }
                resolve();
            }
            catch (err) {
                reject(err);
            }
        }));
        return p;
    };
    UnitOfWork.prototype.connectAsync = function (connectionString) {
        mongoose.Promise = global.Promise;
        var p = new Promise(function (resolve, reject) {
            mongoose.connect(connectionString, {
                server: {
                    poolSize: 5
                }
            }, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                //console.log("success to connect the db..")
                resolve();
            });
        });
        return p;
    };
    UnitOfWork.prototype.closeAsync = function () {
        var p = new Promise(function (resolve, reject) {
            mongoose.disconnect(function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
        return p;
    };
    return UnitOfWork;
}());
exports.UnitOfWork = UnitOfWork;
//# sourceMappingURL=unitOfWork.js.map
