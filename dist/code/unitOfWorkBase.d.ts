/// <reference types="mongoose" />
import * as mongoose from "mongoose";
export declare abstract class UnitOfWorkBase {
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
