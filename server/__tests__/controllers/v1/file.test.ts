import { Request, Response } from "express";
import request from "supertest";
import fs from "fs";
import app from "../../../src/app";
import { getFileTree } from "../../../src/utils/files";
import { getFiles } from "../../../src/controllers/v1/file.controllers";
import ApiResponse from "../../../src/utils/ApiResponse";
import { HttpCode, HttpMessage } from "../../../src/constants/http";

jest.mock("fs");
jest.mock("../../../src/utils/files");

describe("GET /file", () => {
  it("should return a list of files and directories with a 200 status", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();

    // Mock the getFileTree function to return a sample directory structure
    const mockFileTree = [
      {
        name: "dir1",
        type: "directory",
        path: "/path/to/dir1",
        children: [
          { name: "file1.txt", type: "file", path: "/path/to/dir1/file1.txt" },
        ],
      },
      {
        name: "file2.txt",
        type: "file",
        path: "/path/to/file2.txt",
      },
    ];
    (getFileTree as jest.Mock).mockReturnValue(mockFileTree);

    // Call the getFiles handler
    await getFiles(mockRequest, mockResponse, mockNext);

    // Assertions: Ensure status 200 and correct response data
    expect(mockResponse.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(
      new ApiResponse(HttpCode.OK, mockFileTree, HttpMessage.OK)
    );
  });

  it("should handle errors and return a 500 status", async () => {
    // Mock getFileTree to throw an error
    (getFileTree as jest.Mock).mockImplementation(() => {
      throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);
    });

    const response = await request(app).get("/api/v1/file");

    expect(response.status).toBe(HttpCode.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      data: null,
      message: HttpMessage.INTERNAL_SERVER_ERROR,
      success: false,
    });
  });
});

describe("GET /:filePath", () => {
  it("should return 404 if file not found", async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const response = await request(app).get("/api/v1/file/wrongpath");

    expect(response.status).toBe(HttpCode.NOT_FOUND);
    expect(response.body).toEqual({
      status: HttpCode.NOT_FOUND,
      data: null,
      message: HttpMessage.FILE_NOT_FOUND,
      success: false,
    });
  });

  it("should return 200 if successful", async () => {
    const mockfileContent = "test";

    (fs.existsSync as jest.Mock).mockReturnValue(true);

    (fs.readFileSync as jest.Mock).mockReturnValue(mockfileContent);

    const response = await request(app).get("/api/v1/file/testpath");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual({
      status: HttpCode.OK,
      data: mockfileContent,
      message: HttpMessage.OK,
      success: true,
    });
  });
});

describe("POST /save", () => {
  it("should return 400 if path and content are not provided", async () => {
    const response = await request(app).post("/api/v1/file/save");

    expect(response.status).toBe(HttpCode.BAD_REQUEST);
    expect(response.body).toEqual({
      status: HttpCode.BAD_REQUEST,
      data: null,
      message: "path & content must be provided",
      success: false,
    });
  });

  it("should return 404 if file not found", async () => {
    const mockFilePath = "wrongpath";
    const mockfileContent = "test";

    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const response = await request(app)
      .post("/api/v1/file/save")
      .send({ path: mockFilePath, content: mockfileContent });

    expect(response.status).toBe(HttpCode.NOT_FOUND);
    expect(response.body).toEqual({
      status: HttpCode.NOT_FOUND,
      data: null,
      message: HttpMessage.FILE_NOT_FOUND,
      success: false,
    });
  });

  it("should return 200 if successful", async () => {
    const mockFilePath = "rightpath";
    const mockfileContent = "test";

    (fs.existsSync as jest.Mock).mockReturnValue(true);

    (fs.readFileSync as jest.Mock).mockReturnValue(mockfileContent);

    const response = await request(app)
      .post("/api/v1/file/save")
      .send({ path: mockFilePath, content: mockfileContent });

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual({
      status: HttpCode.OK,
      data: null,
      message: HttpMessage.OK,
      success: true,
    });
  });
});
