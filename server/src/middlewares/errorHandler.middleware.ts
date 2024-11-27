import { NextFunction, Request, Response } from "express";
import { HttpCode, HttpMessage } from "../constants/http";
import ApiResponse from "../utils/ApiResponse";

interface IncomingError extends Error {
  status?: number;
  errors?: any[];
}

const errorHandler = (
  error: IncomingError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.status ||= HttpCode.INTERNAL_SERVER_ERROR;
  error.message ||= HttpMessage.INTERNAL_SERVER_ERROR;

  res
    .status(error.status)
    .json(new ApiResponse(error.status, null, error.message));
};

export default errorHandler;
