/// <reference types="mongoose" />
import { UnitOfWorkBase } from './unitOfWorkBase';
import * as mongoose from 'mongoose';
export declare class UnitOfWorkInMemory {
    private unitOfWork;
    constructor(unitOfWork: UnitOfWorkBase);
    add<T extends mongoose.Document>(entity: T): void;
    remove<T extends mongoose.Document>(entity: T): void;
    update<T extends mongoose.Document>(entity: T): void;
    saveChange(): Promise<void>;
    connect(): Promise<void>;
    close(): Promise<void>;
    reset(): Promise<void>;
}
