/// <reference types="mongoose" />
import { UnitOfWorkBase } from "./unitOfWorkBase";
import * as mongoose from "mongoose";
export declare class UnitOfWorkInMemory {
    private unitOfWork;
    constructor(unitOfWork: UnitOfWorkBase);
    static initPrepareStorageAsync(): Promise<void>;
    add<T extends mongoose.Document>(entity: T): void;
    remove<T extends mongoose.Document>(entity: T): void;
    update<T extends mongoose.Document>(entity: T): void;
    saveChangeAsync(): Promise<void>;
    connectAsync(): Promise<void>;
    closeAsync(): Promise<void>;
    resetAsync(): Promise<void>;
}
