import { UnitOfWorkBase } from './../code/unitOfWorkBase';
import { PersonRep } from './personRep';

export class MyUnitOfWork extends UnitOfWorkBase {

  constructor() {
    super();
  }

  reps = {
    personRep: new PersonRep(this),
  };

}
