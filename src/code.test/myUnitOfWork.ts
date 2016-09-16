/// <reference path="./../../typings/index.d.ts" />

import {UnitOfWorkBase} from "./../code/unitOfWorkBase";
import {PeopleRepository} from "./peopleRepository";

export class MyUnitOfWork extends UnitOfWorkBase {

    reps = {
        peopleRepository: new PeopleRepository(this)
    };

}