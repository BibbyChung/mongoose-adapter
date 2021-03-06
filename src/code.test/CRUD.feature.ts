import * as assert from 'assert';
import { MyUnitOfWork } from './myUnitOfWork';
import { PersonRep, IPerson } from './personRep';

let myDB: MyUnitOfWork;
const prepareToRun = (self, tag: string) => {
  self.Before({ tags: [tag], timeout: 3600 * 1000 }, async (scenario: any) => {

    myDB = new MyUnitOfWork();
    myDB.isInMemory = true;
    await myDB.connect('xxxx');

  });
  self.After({ tags: [tag] }, async (scenario) => {

    await myDB.close();

  });
};

export = function () {

  prepareToRun(this, '@abcd');

  this.Given(/^The database is empty\.$/, async () => {

    await myDB.reset();

  });

  this.When(/^Execute the method of create\.$/, async (table) => {

    const arr: IPerson[] = table.hashes();

    for (const item of arr) {

      const entity = myDB.reps.personRep.createNewEntity();
      entity._id = item._id;
      entity.name = item.name;
      entity.age = item.age;
      entity.birthday = item.birthday;
      myDB.add(entity);

    }

    await myDB.saveChange();

  });

  this.Given(/^The database has a record\.$/, async (table) => {

    await myDB.reset();

    const arr: IPerson[] = table.hashes();

    for (const item of arr) {

      const entity = myDB.reps.personRep.createNewEntity();
      entity._id = item._id;
      entity.name = item.name;
      entity.age = item.age;
      entity.birthday = item.birthday;
      myDB.add(entity);

    }

    await myDB.saveChange();

  });

  this.When(/^Execute the method of delete\.$/, async () => {

    const data = await myDB.reps.personRep.getAll()
      .find({ _id: 'abcdefghijk' })
      .exec();

    for (const item of data) {
      myDB.remove(item);
    }

    await myDB.saveChange();

  });

  this.Then(/^The result of database is empty\.$/, async () => {

    const data = await myDB.reps.personRep.getAll()
      .find({})
      .exec();

    assert.equal(data.length, 0);

  });

  this.When(/^Execute the method of update\.$/, async (table) => {

    const arr: IPerson[] = table.hashes();

    const data = await myDB.reps.personRep.getAll()
      .find({ _id: 'abcdefghijk' })
      .exec();

    data[0].name = arr[0].name;
    data[0].age = arr[0].age;
    data[0].birthday = arr[0].birthday;
    myDB.update(data[0]);

    await myDB.saveChange();

  });

  this.Then(/^The result of database has a record\.$/, async (table) => {

    const arr: IPerson[] = table.hashes();
    const total = arr.length;

    const data = await myDB.reps.personRep.getAll()
      .find({})
      .exec();

    assert.equal(data.length, total);

    assert.equal(data[0]._id, arr[0]._id);
    assert.equal(data[0].name, arr[0].name);
    assert.equal(data[0].age, arr[0].age);
    assert.deepEqual(data[0].birthday, new Date(arr[0].birthday.toString()));

  });

};
