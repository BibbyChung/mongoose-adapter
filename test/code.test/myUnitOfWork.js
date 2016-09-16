/// <reference path="./../../typings/index.d.ts" />
"use strict";
const unitOfWorkBase_1 = require("./../code/unitOfWorkBase");
const personRep_1 = require("./personRep");
class MyUnitOfWork extends unitOfWorkBase_1.UnitOfWorkBase {
    constructor() {
        super();
        this.reps = {
            personRep: new personRep_1.PersonRep(this)
        };
    }
}
exports.MyUnitOfWork = MyUnitOfWork;
//# sourceMappingURL=myUnitOfWork.js.map
