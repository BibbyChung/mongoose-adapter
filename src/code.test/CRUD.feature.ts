/// <reference path="./../../typings/index.d.ts" />

import * as assert from "assert";
import {MyUnitOfWork} from "./myUnitOfWork";
import {UnitOfWorkInMemory} from "./../code/unitOfWorkInMemory";
import {PersonRep, IPerson} from "./personRep";

let myDb: MyUnitOfWork;
let myDbInMemory: UnitOfWorkInMemory;
let prepareToRun = (_self, tag: string) => {
  _self.Before({ tags: [tag] }, async (scenario: any) => {

    myDb = new MyUnitOfWork();
    myDbInMemory = new UnitOfWorkInMemory(myDb);
    await myDbInMemory.connectAsync();

  });
  _self.After({ tags: [tag] }, async (scenario) => {

    await myDbInMemory.closeAsync();

  });
};

export = function () {

  prepareToRun(this, "@abcd");

  this.Given(/^The database is empty\.$/, async function () {

    await myDbInMemory.resetAsync();

  });

  this.When(/^Execute the method of create\.$/, async function (table) {

    let arr: IPerson[] = table.hashes();

    for (let item of arr) {

      var entity = myDb.reps.personRep.createNewEntity();
      entity._id = item._id;
      entity.name = item.name;
      entity.age = item.age;
      entity.birthday = item.birthday;
      myDb.add(entity);

    }

    await myDb.saveChangeAsync();

  });

  this.Given(/^The database has a record\.$/, async function (table) {

    await myDbInMemory.resetAsync();

    let arr: IPerson[] = table.hashes();

    for (let item of arr) {

      var entity = myDb.reps.personRep.createNewEntity();
      entity._id = item._id;
      entity.name = item.name;
      entity.age = item.age;
      entity.birthday = item.birthday;
      myDb.add(entity);

    }

    await myDb.saveChangeAsync();

  });

  this.When(/^Execute the method of delete\.$/, async function () {

    let data = await myDb.reps.personRep.getAll()
      .find({ _id: "abcdefghijk" })
      .exec();

    for (let item of data) {
      myDb.remove(item);
    }

    await myDb.saveChangeAsync();

  });

  this.Then(/^The result of database is empty\.$/, async function () {

    let data = await myDb.reps.personRep.getAll()
      .find({})
      .exec();

    assert.equal(data.length, 0);

  });

  this.When(/^Execute the method of update\.$/, async function (table) {

    let arr: IPerson[] = table.hashes();

    let data = await myDb.reps.personRep.getAll()
      .find({ _id: "abcdefghijk" })
      .exec();

    data[0].name = arr[0].name;
    data[0].age = arr[0].age;
    data[0].birthday = arr[0].birthday
    myDb.update(data[0]);

    await myDb.saveChangeAsync();

  });

  this.Then(/^The result of database has a record\.$/, async function (table) {

    let arr: IPerson[] = table.hashes();
    let total = arr.length;

    let data = await myDb.reps.personRep.getAll()
      .find({})
      .exec();

    assert.equal(data.length, total);

    assert.equal(data[0]._id, arr[0]._id);
    assert.equal(data[0].name, arr[0].name);
    assert.equal(data[0].age, arr[0].age);
    assert.deepEqual(data[0].birthday, new Date(arr[0].birthday.toString()));

  });

}