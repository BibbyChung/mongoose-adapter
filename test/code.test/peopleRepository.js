/// <reference path="./../../typings/index.d.ts" />
"use strict";
const mongoose = require("mongoose");
const baseRepository_1 = require("./../code/baseRepository");
class PeopleRepository extends baseRepository_1.BaseRepository {
    constructor(unitOfWork) {
        super();
        this.unitOfWork = unitOfWork;
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
exports.PeopleRepository = PeopleRepository;
//# sourceMappingURL=peopleRepository.js.map
