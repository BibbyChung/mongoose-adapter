/// <reference path="../../typings/index.d.ts" />
import * as mongoose from "mongoose";
import { IUnitOfWork } from "./IUnitOfWork";
export declare class UnitOfWork implements IUnitOfWork {
    private addArr;
    private removeArr;
    private updateArr;
    add<T extends mongoose.Document>(entity: T): void;
    remove<T extends mongoose.Document>(entity: T): void;
    update<T extends mongoose.Document>(entity: T): void;
    saveChangeAsync(): Promise<void>;
    connectAsync(connectionString: string): Promise<void>;
    closeAsync(): Promise<void>;
}
