import { Response } from "express"


export class ApiException{
    public statusCode: number;
    public message: string;
    constructor(message: string, statusCode: number){
        this.message = message;
        this.statusCode = statusCode; 
    }
}