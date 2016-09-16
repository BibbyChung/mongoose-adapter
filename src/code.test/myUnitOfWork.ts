/// <reference path="./../../typings/index.d.ts" />

import {UnitOfWorkBase} from "./../code/unitOfWorkBase";
import {PersonRep} from "./personRep";

export class MyUnitOfWork extends UnitOfWorkBase {

    reps = {
        personRep: new PersonRep(this)
    };

}