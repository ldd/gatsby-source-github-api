const fetcher = require("graphql-fetch");
const { fetchFromGithub, DEFAULT_QUERY } = require("../src/helper");
const fetch = require("jest-fetch-mock");

jest.mock("graphql-fetch");

describe("[stubbed github API]", () => {
  const expectedAnswer = JSON.stringify({ someProperty: "someValue" });
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("eventually returns a value", async () => {
    fetch.mockResponse(expectedAnswer);
    fetcher.mockReturnValue(fetch);

    const response = await fetchFromGithub();

    expect(fetch).toHaveBeenCalled();
    const [, , options] = fetch.mock.calls[0];
    expect(options).toHaveProperty("method", "POST");
    expect(response.body).toBe(expectedAnswer);
  });

  it("uses the default query", async () => {
    fetcher.mockReturnValue(fetch);
    const response = await fetchFromGithub();
    const [query] = fetch.mock.calls[0];
    expect(query).toBe(DEFAULT_QUERY);
  });

  it("uses passed on query", async () => {
    fetcher.mockReturnValue(fetch);

    const myQuery = "someQuery";
    const response = await fetchFromGithub(undefined, undefined, myQuery);
    const [query] = fetch.mock.calls[0];
    expect(query).toBe(myQuery);
  });
});
