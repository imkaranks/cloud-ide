export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HttpMessage {
  OK = "OK",
  CREATED = "Created",
  NO_CONTENT = "No Content",
  BAD_REQUEST = "Bad Request",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Not Found",
  INTERNAL_SERVER_ERROR = "Internal Server Error",
  FILE_NOT_FOUND = "File with provided path does not exist",
  INVALID_FILE_PATH = "Invalid file path provided",
  FILE_READ_ERROR = "Error reading file",
}
