import {StatusCodes} from "http-status-codes";

import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError{
    readonly statusCode: number = StatusCodes.BAD_REQUEST;

    constructor(public message:string){
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:this.message}]
    }
}