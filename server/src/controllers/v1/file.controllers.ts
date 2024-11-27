import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import handleAsyncError from "../../utils/handleAsyncError";
import { getFileTree } from "../../utils/files";
import { HttpCode, HttpMessage } from "../../constants/http";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

const directoryToWatch = path.resolve(__dirname, "../../../tmp");

export const getFiles = handleAsyncError(
  async (req: Request, res: Response) => {
    const response = new ApiResponse(
      HttpCode.OK,
      getFileTree(directoryToWatch),
      HttpMessage.OK
    );

    res.status(response.status).json(response);
  }
);

export const getFileContent = handleAsyncError(
  async (req: Request, res: Response) => {
    const { filePath } = req.params as { filePath: string };

    if (!filePath) {
      res.status(400).json({ success: false });
    }

    if (!fs.existsSync(filePath?.trim())) {
      throw new ApiError(HttpCode.NOT_FOUND, HttpMessage.FILE_NOT_FOUND);
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");

    const response = new ApiResponse(HttpCode.OK, fileContent, HttpMessage.OK);

    res.status(response.status).json(response);
  }
);

export const saveFileContent = handleAsyncError(
  async (req: Request, res: Response) => {
    const { path, content } = req.body as { path: string; content: string };

    if ([path, content].some((field) => !field || !field?.trim())) {
      throw new ApiError(
        HttpCode.BAD_REQUEST,
        "path & content must be provided"
      );
    }

    const formattedPath = decodeURIComponent(path.trim());

    if (!fs.existsSync(formattedPath)) {
      throw new ApiError(HttpCode.NOT_FOUND, HttpMessage.FILE_NOT_FOUND);
    }

    fs.writeFileSync(formattedPath, content, "utf-8");

    const response = new ApiResponse(HttpCode.OK, null, HttpMessage.OK);

    res.status(response.status).json(response);
  }
);
