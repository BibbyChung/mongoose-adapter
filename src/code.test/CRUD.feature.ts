/// <reference path="./../../typings/index.d.ts" />

import * as assert from "assert";
import {MyUnitOfWork} from "./myUnitOfWork";
import {UnitOfWorkInMemory} from "./../code/unitOfWorkInMemory";
import {PeopleRepository, IPeople} from "./peopleRepository";

let mydb: UnitOfWorkInMemory;
let myUnitOfWork: MyUnitOfWork;
let prepareToRun = (_self, tag: string) => {
  _self.Before({ tags: [tag] }, async (scenario: any) => {

    myUnitOfWork = new MyUnitOfWork();
    mydb = new UnitOfWorkInMemory(myUnitOfWork);
    await mydb.connectAsync();

  });
  _self.After({ tags: [tag] }, async (scenario) => {

    await mydb.closeAsync();

  });
};

export = function () {

  prepareToRun(this, "@abcd");

  this.Given(/^The database is empty\.$/, async function () {

    await mydb.resetAsync();

  });

  this.When(/^Execute the method of create\.$/, async function (table) {

    let arr: IPeople[] = table.hashes();

    //let peopleRep = new PeopleRepository(myUnitOfWork);

    for (let item of arr) {

      var entity = myUnitOfWork.peopleRepository.createNewEntity();
      entity._id = item._id;
      entity.name = item.name;
      entity.age = item.age;
      entity.birthday = item.birthday;
      myUnitOfWork.peopleRepository.add(entity);

    }

    await myUnitOfWork.saveChangeAsync();

  });

  this.Given(/^The database has a record\.$/, async function (table) {

    await mydb.resetAsync();

    let arr: IPeople[] = table.hashes();
    var rep = myUnitOfWork.peopleRepository;

    for (let item of arr) {

      var entity = rep.createNewEntity();
      entity._id = item._id;
      entity.name = item.name;
      entity.age = item.age;
      entity.birthday = item.birthday;
      rep.add(entity);

    }

    await myUnitOfWork.saveChangeAsync();

  });

  this.When(/^Execute the method of delete\.$/, async function () {

    let rep = myUnitOfWork.peopleRepository;
    let data = await rep.getAll()
      .find({ _id: "abcdefghijk" })
      .exec();

    for (let item of data) {
      rep.remove(item);
    }

    await myUnitOfWork.saveChangeAsync();

  });

  this.Then(/^The result of database is empty\.$/, async function () {

    let rep = myUnitOfWork.peopleRepository;
    let data = await rep.getAll()
      .find({})
      .exec();

    assert.equal(data.length, 0);

  });

  this.When(/^Execute the method of update\.$/, async function (table) {

    let arr: IPeople[] = table.hashes();

    let rep = myUnitOfWork.peopleRepository;
    let data = await rep.getAll()
      .find({ _id: "abcdefghijk" })
      .exec();

    data[0].name = arr[0].name;
    data[0].age = arr[0].age;
    data[0].birthday = arr[0].birthday
    rep.update(data[0]);

    await myUnitOfWork.saveChangeAsync();

  });

  this.When(/^Execute the method of get\.$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  this.Then(/^The result of database has a record\.$/, async function (table) {

    let arr: IPeople[] = table.hashes();
    let total = arr.length;

    let rep = myUnitOfWork.peopleRepository;
    let data = await rep.getAll()
      .find({})
      .exec();

    assert.equal(data.length, total);

    assert.equal(data[0]._id, arr[0]._id);
    assert.equal(data[0].name, arr[0].name);
    assert.equal(data[0].age, arr[0].age);
    assert.deepEqual(data[0].birthday, new Date(arr[0].birthday.toString()));

  });

}