import { ErrorRequestHandler } from "express";
import { HttpError } from "../erros/HttpError.js";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            status: "error",
            message: err.message
        });
    }

    if (err instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: "error",
            message: "Validation failed",
            errors: err.issues
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Internal Server Error",
    });
}