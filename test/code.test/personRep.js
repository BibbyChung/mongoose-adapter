/// <reference path="./../../typings/index.d.ts" />
"use strict";
const mongoose = require("mongoose");
const repositoryBase_1 = require("./../code/repositoryBase");
class PersonRep extends repositoryBase_1.RepositoryBase {
    constructor(unitOfWork) {
        super(unitOfWork);
    }
    getDocumentName() {
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
