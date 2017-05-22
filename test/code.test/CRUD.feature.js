"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const assert = require("assert");
const myUnitOfWork_1 = require("./myUnitOfWork");
const unitOfWorkInMemory_1 = require("./../code/unitOfWorkInMemory");
let myDb;
let myDbInMemory;
const prepareToRun = (self, tag) => {
    self.Before({ tags: [tag] }, (scenario) => __awaiter(this, void 0, void 0, function* () {
        myDb = new myUnitOfWork_1.MyUnitOfWork();
        myDbInMemory = new unitOfWorkInMemory_1.UnitOfWorkInMemory(myDb);
        yield myDbInMemory.connectAsync();
    }));
    self.After({ tags: [tag] }, (scenario) => __awaiter(this, void 0, void 0, function* () {
        yield myDbInMemory.closeAsync();
    }));
};
module.exports = function () {
    prepareToRun(this, '@abcd');
    this.Given(/^The database is empty\.$/, () => __awaiter(this, void 0, void 0, function* () {
        yield myDbInMemory.resetAsync();
    }));
    this.When(/^Execute the method of create\.$/, (table) => __awaiter(this, void 0, void 0, function* () {
        const arr = table.hashes();
        for (const item of arr) {
            const entity = myDb.reps.personRep.createNewEntity();
            entity._id = item._id;
            entity.name = item.name;
            entity.age = item.age;
            entity.birthday = item.birthday;
            myDb.add(entity);
        }
        yield myDb.saveChangeAsync();
    }));
    this.Given(/^The database has a record\.$/, (table) => __awaiter(this, void 0, void 0, function* () {
        yield myDbInMemory.resetAsync();
        const arr = table.hashes();
        for (const item of arr) {
            const entity = myDb.reps.personRep.createNewEntity();
            entity._id = item._id;
            entity.name = item.name;
            entity.age = item.age;
            entity.birthday = item.birthday;
            myDb.add(entity);
        }
        yield myDb.saveChangeAsync();
    }));
    this.When(/^Execute the method of delete\.$/, () => __awaiter(this, void 0, void 0, function* () {
        const data = yield myDb.reps.personRep.getAll()
            .find({ _id: 'abcdefghijk' })
            .exec();
        for (const item of data) {
            myDb.remove(item);
        }
        yield myDb.saveChangeAsync();
    }));
    this.Then(/^The result of database is empty\.$/, () => __awaiter(this, void 0, void 0, function* () {
        const data = yield myDb.reps.personRep.getAll()
            .find({})
            .exec();
        assert.equal(data.length, 0);
    }));
    this.When(/^Execute the method of update\.$/, (table) => __awaiter(this, void 0, void 0, function* () {
        const arr = table.hashes();
        const data = yield myDb.reps.personRep.getAll()
            .find({ _id: 'abcdefghijk' })
            .exec();
        data[0].name = arr[0].name;
        data[0].age = arr[0].age;
        data[0].birthday = arr[0].birthday;
        myDb.update(data[0]);
        yield myDb.saveChangeAsync();
    }));
    this.Then(/^The result of database has a record\.$/, (table) => __awaiter(this, void 0, void 0, function* () {
        const arr = table.hashes();
        const total = arr.length;
        const data = yield myDb.reps.personRep.getAll()
            .find({})
            .exec();
        assert.equal(data.length, total);
        assert.equal(data[0]._id, arr[0]._id);
        assert.equal(data[0].name, arr[0].name);
        assert.equal(data[0].age, arr[0].age);
        assert.deepEqual(data[0].birthday, new Date(arr[0].birthday.toString()));
    }));
};
//# sourceMappingURL=CRUD.feature.js.map
