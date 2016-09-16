/// <reference path="./../../typings/index.d.ts" />

import {UnitOfWorkBase} from "./../code/unitOfWorkBase";
import {PeopleRepository} from "./peopleRepository";

export class MyUnitOfWork extends UnitOfWorkBase {

    peopleRepository = new PeopleRepository(this);

}