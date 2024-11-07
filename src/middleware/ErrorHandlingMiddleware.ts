import { NextFunction, Request, Response } from "express";
import { ApiException } from "../exceptions/ApiException";


export default function(err: any, req: any, res: any, next: NextFunction) {
    console.log(err)
    if(err instanceof ApiException){
        return res.status(err.statusCode).json({message: err.message, statusCode: err.statusCode})
    }
    res.status(500).json({message: "Непредвиденная ошибка", statusCode: 500})
}