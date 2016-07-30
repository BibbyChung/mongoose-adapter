# mongoose-adapter

Make the mongoose easy to use.

## Install

``` shell
$ npm install
$ gulp
```

> **Note:** You have to install [cucumber-js](https://github.com/cucumber/cucumber-js) and [typings](https://github.com/typings/typings) in your global environment.

## Quick Start

```javascript
//create data

let unitOfWork = new UnitOfWork();
let rep = new PeopleRepository(unitOfWork);

var entity = rep.createNewEntity();
entity._id = "1qaz2wsx";
entity.name = "Bibby Chung";
entity.age = 18;
entity.birthday = new Date("1990-04-01 13:20:30");
peopleRep.add(entity);

await unitOfWork.saveChangeAsync();

```

```javascript
//update data

let unitOfWork = new UnitOfWork();
let rep = new PeopleRepository(unitOfWork);
let data = await rep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();

let entity = data[0];
entity.name = "Bibby Chung 1";
entity.age = 22;
entity.birthday = new Date("1995-08-08 13:20:30");
rep.update(entity);

await unitOfWork.saveChangeAsync();

```

```javascript
//delete data
let unitOfWork = new UnitOfWork();
let rep = new PeopleRepository(unitOfWork);
let data = await rep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();

for (let item of data) {
    rep.remove(item);
}

await unitOfWork.saveChangeAsync();
```

```javascript
//get data
let unitOfWork = new UnitOfWork();
let rep = new PeopleRepository(unitOfWork);
let data = await rep.getAll()
    .find({ _id: "1qaz2wsx" })
    .exec();
```
