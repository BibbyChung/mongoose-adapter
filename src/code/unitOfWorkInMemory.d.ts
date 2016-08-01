/// <reference path="../../typings/index.d.ts" />
import { IUnitOfWork } from "./IUnitOfWork";
import * as mongoose from "mongoose";
export declare class UnitOfWorkInMemory implements IUnitOfWork {
    private unitOfWork;
    constructor(unitOfWork: IUnitOfWork);
    add<T extends mongoose.Document>(entity: T): void;
    remove<T extends mongoose.Document>(entity: T): void;
    update<T extends mongoose.Document>(entity: T): void;
    saveChangeAsync(): Promise<void>;
    connectAsync(): Promise<void>;
    closeAsync(): Promise<void>;
    resetAsync(): Promise<void>;
}
