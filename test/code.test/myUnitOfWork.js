/// <reference path="./../../typings/index.d.ts" />
"use strict";
const unitOfWorkBase_1 = require("./../code/unitOfWorkBase");
const peopleRepository_1 = require("./peopleRepository");
class MyUnitOfWork extends unitOfWorkBase_1.UnitOfWorkBase {
    constructor(...args) {
        super(...args);
        this.peopleRepository = new peopleRepository_1.PeopleRepository(this);
    }
}
exports.MyUnitOfWork = MyUnitOfWork;
//# sourceMappingURL=myUnitOfWork.js.map
