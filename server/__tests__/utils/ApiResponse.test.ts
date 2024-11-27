import ApiResponse from "../../src/utils/ApiResponse";

describe("ApiResponse", () => {
  it("should initialize with correct properties", () => {
    const response = new ApiResponse(200, { foo: "bar" }, "Success");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ foo: "bar" });
    expect(response.message).toBe("Success");
    expect(response.success).toBe(true);
  });

  it("should handle non-2xx status as unsuccessful", () => {
    const response = new ApiResponse(400, {}, "Bad Request");
    expect(response.success).toBe(false);
  });
});
