/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
export declare abstract class UnitOfWorkBase {
    isInMemory: boolean;
    private addArr;
    private removeArr;
    private updateArr;
    add<T extends mongoose.Document>(entity: T): void;
    remove<T extends mongoose.Document>(entity: T): void;
    update<T extends mongoose.Document>(entity: T): void;
    saveChange(): Promise<void>;
    connect(connectionString: string): Promise<void>;
    close(): Promise<void>;
    reset(): Promise<void>;
}
