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
const assert = require("assert");
const unitOfWork_1 = require("./../code/unitOfWork");
const unitOfWorkInMemory_1 = require("./../code/unitOfWorkInMemory");
const peopleRepository_1 = require("./peopleRepository");
let mydb;
let unitOfWork;
let prepareToRun = (_self, tag) => {
    _self.Before({ tags: [tag] }, (scenario) => __awaiter(this, void 0, void 0, function* () {
        unitOfWork = new unitOfWork_1.UnitOfWork();
        mydb = new unitOfWorkInMemory_1.UnitOfWorkInMemory(unitOfWork);
        yield mydb.connectAsync();
    }));
    _self.After({ tags: [tag] }, (scenario) => __awaiter(this, void 0, void 0, function* () {
        yield mydb.closeAsync();
    }));
};
module.exports = function () {
    prepareToRun(this, "@abcd");
    this.Given(/^The database is empty\.$/, function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield mydb.resetAsync();
        });
    });
    this.When(/^Execute the method of create\.$/, function (table) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = table.hashes();
            let peopleRep = new peopleRepository_1.PeopleRepository(unitOfWork);
            for (let item of arr) {
                var entity = peopleRep.createNewEntity();
                entity._id = item._id;
                entity.name = item.name;
                entity.age = item.age;
                entity.birthday = item.birthday;
                peopleRep.add(entity);
            }
            yield unitOfWork.saveChangeAsync();
        });
    });
    this.Given(/^The database has a record\.$/, function (table) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mydb.resetAsync();
            let arr = table.hashes();
            let peopleRep = new peopleRepository_1.PeopleRepository(unitOfWork);
            for (let item of arr) {
                var entity = peopleRep.createNewEntity();
                entity._id = item._id;
                entity.name = item.name;
                entity.age = item.age;
                entity.birthday = item.birthday;
                peopleRep.add(entity);
            }
            yield unitOfWork.saveChangeAsync();
        });
    });
    this.When(/^Execute the method of delete\.$/, function () {
        return __awaiter(this, void 0, void 0, function* () {
            let peopleRep = new peopleRepository_1.PeopleRepository(unitOfWork);
            let data = yield peopleRep.getAll()
                .find({ _id: "abcdefghijk" })
                .exec();
            for (let item of data) {
                peopleRep.remove(item);
            }
            yield unitOfWork.saveChangeAsync();
        });
    });
    this.Then(/^The result of database is empty\.$/, function () {
        return __awaiter(this, void 0, void 0, function* () {
            let peopleRep = new peopleRepository_1.PeopleRepository(unitOfWork);
            let data = yield peopleRep.getAll()
                .find({})
                .exec();
            assert.equal(data.length, 0);
        });
    });
    this.When(/^Execute the method of update\.$/, function (table) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = table.hashes();
            let peopleRep = new peopleRepository_1.PeopleRepository(unitOfWork);
            let data = yield peopleRep.getAll()
                .find({ _id: "abcdefghijk" })
                .exec();
            data[0].name = arr[0].name;
            data[0].age = arr[0].age;
            data[0].birthday = arr[0].birthday;
            peopleRep.update(data[0]);
            yield unitOfWork.saveChangeAsync();
        });
    });
    this.When(/^Execute the method of get\.$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
    this.Then(/^The result of database has a record\.$/, function (table) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = table.hashes();
            let total = arr.length;
            let peopleRep = new peopleRepository_1.PeopleRepository(unitOfWork);
            let data = yield peopleRep.getAll()
                .find({})
                .exec();
            assert.equal(data.length, total);
            assert.equal(data[0]._id, arr[0]._id);
            assert.equal(data[0].name, arr[0].name);
            assert.equal(data[0].age, arr[0].age);
            assert.deepEqual(data[0].birthday, new Date(arr[0].birthday.toString()));
        });
    });
};
//# sourceMappingURL=CRUD.feature.js.map
