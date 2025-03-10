import { isString } from "lodash-es";


class EcUIError extends Error {
    constructor(msg:string) {
        super(msg);
        this.name = "EcUIError";
    }
}

export function throwError(scope: string,msg: string) {
    throw new EcUIError(`[${scope}]: ${msg}`);
}

export function debugWarn(error:Error):void
export function debugWarn(scope: string, msg:string):void

export function debugWarn(scope: string|Error,msg?:string){
    if(process.env.NODE_ENV !== "production") {
        const err = isString(scope) ? new Error(`[${scope}]: ${msg}`) : scope;
        console.warn(err);
    }
}