import { Request, Response } from "express";
import handleAsyncError from "../../src/utils/handleAsyncError";

describe("handleAsyncError", () => {
  it("should call next() when the async function resolves successfully", async () => {
    const mockNext = jest.fn();
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;

    const asyncHandler = handleAsyncError(async (req, res, next) => {
      return Promise.resolve();
    });

    await asyncHandler(mockRequest, mockResponse, mockNext);
    expect(mockNext).not.toHaveBeenCalled(); // It should not call next as no error occurs
  });

  it("should call next() with an error when the async function rejects", async () => {
    const mockNext = jest.fn();
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;

    const asyncHandler = handleAsyncError(async (req, res, next) => {
      return Promise.reject(new Error("Async error"));
    });

    await asyncHandler(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error)); // It should pass the error to next
  });
});
