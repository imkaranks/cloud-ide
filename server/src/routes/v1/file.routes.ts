import express from "express";
import {
  getFileContent,
  getFiles,
  saveFileContent,
} from "../../controllers/v1/file.controllers";

const fileRouter = express.Router();

fileRouter.get("/", getFiles);

fileRouter.get("/:filePath", getFileContent);

fileRouter.post("/save", saveFileContent);

export default fileRouter;
