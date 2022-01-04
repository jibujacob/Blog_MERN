import { StatusCodes } from "http-status-codes";

import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError{
    readonly statusCode: number = StatusCodes.NOT_FOUND;
    
    constructor(){
        super("Not Found");
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:"Not Found"}];
    }
    
}