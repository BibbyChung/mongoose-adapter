# mongoose-adapter

Make the mongoose easy to use.

## Install

``` shell
$ npm install mongoose mockgoose --save
$ typings install dt~es6-promise dt~mongoose dt~mongoose-promise --global --save
```

> **Note:** You have to install [typings](https://github.com/typings/typings) in your global environment.

## Quick Start

### typescript

```javascript
//implement the BaseRepository

import {BaseRepository, IUnitOfWork} from "mongoose-adapter";

export class PeopleRepository extends BaseRepository<IPeople> {

	constructor(unitOfWork: IUnitOfWork) {
		super(unitOfWork);
	}

	getDocumentName() {
		return "People";
	}

	getSchema() {

		let userSchema = {
			_id: { type: String, index: { unique: true } },
			name: { type: String },
			age: { type: Number },
			birthday: { type: Date }
		};
		let s = new mongoose.Schema(userSchema);
		return s;

	}

}

export interface IPeople extends mongoose.Document {
	_id: string;
	name: string,
	age: number,
	birthday: Date
}
```

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

### javascript 
(later..)