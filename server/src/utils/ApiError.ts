export default class ApiError extends Error {
  data: null;
  success: boolean;

  constructor(
    public status: number,
    public message: string = "Something went wrong",
    public errors: any[] = [],
    public stack?: string
  ) {
    super(message);

    this.data = null;
    this.success = false;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
