const { fetchFromGithub } = require("../src/helper");

describe("[actual github API]", () => {
  beforeEach(() => {});
  it("fails when a bad token is given", async () => {
    const response = await fetchFromGithub();
    expect(response).toHaveProperty("message", "Bad credentials");
  });
});
