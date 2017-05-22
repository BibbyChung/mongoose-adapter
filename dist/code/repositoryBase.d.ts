/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import { UnitOfWorkBase } from './unitOfWorkBase';
export declare abstract class RepositoryBase<T extends mongoose.Document> {
    private unitOfWork;
    abstract getCollectionName(): string;
    abstract getSchema(): mongoose.Schema;
    private model;
    constructor(unitOfWork: UnitOfWorkBase);
    private initSchemaDefinition();
    createNewEntity(): T;
    getAll(): mongoose.Model<T>;
}
