import ApiError from "../../src/utils/ApiError";

describe("ApiError", () => {
  it("should initialize with correct properties", () => {
    const error = new ApiError(500, "Server Error", []);
    expect(error.status).toBe(500);
    expect(error.message).toBe("Server Error");
    expect(error.success).toBe(false);
    expect(error.data).toBeNull();
  });
});
