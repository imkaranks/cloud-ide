import { NextFunction, Request, RequestHandler, Response } from "express";

const handleAsyncError = (callback: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default handleAsyncError;
