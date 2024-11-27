export default class ApiResponse<T> {
  success: boolean;

  constructor(
    public status: number,
    public data: T,
    public message: string = "Success"
  ) {
    this.success = status < 400;
  }
}
