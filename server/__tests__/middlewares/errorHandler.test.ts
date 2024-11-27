import { Request, Response } from "express";
import errorHandler from "../../src/middlewares/errorHandler.middleware";

describe("errorHandler", () => {
  it("should handle error and return a formatted response", () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();

    const error: Error & { status?: number } = new Error("Some error");
    error.status = 400;

    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      status: 400,
      data: null,
      message: "Some error",
    });
  });

  it("should set status and message if not provided", () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();

    const error = new Error("Some internal error");
    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      status: 500,
      data: null,
      message: "Some internal error",
    });
  });
});
