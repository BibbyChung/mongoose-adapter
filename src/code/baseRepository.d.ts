/// <reference path="../../typings/index.d.ts" />
import * as mongoose from "mongoose";
import { IUnitOfWork } from "./IUnitOfWork";
export declare abstract class BaseRepository<T extends mongoose.Document> {
    unitOfWork: IUnitOfWork;
    abstract getDocumentName(): string;
    abstract getSchema(): mongoose.Schema;
    constructor(unitOfWork: IUnitOfWork);
    createNewEntity(): T;
    getAll(): mongoose.Model<T>;
    add<T extends mongoose.Document>(entity: T): void;
    remove<T extends mongoose.Document>(entity: T): void;
    update<T extends mongoose.Document>(entity: T): void;
}
