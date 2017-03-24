"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const repositoryBase_1 = require("./../code/repositoryBase");
class PersonRep extends repositoryBase_1.RepositoryBase {
    constructor(unitOfWork) {
        super(unitOfWork);
    }
    getCollectionName() {
        return "Person";
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
exports.PersonRep = PersonRep;
//# sourceMappingURL=personRep.js.map
