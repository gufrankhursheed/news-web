import { fetchTopHeadlines, fetchCategoryNews, searchNews } from "@/app/api/news/route";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("News API", () => {
  it("fetches top headlines successfully", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ articles: [{ title: "Test Headline" }] }));

    const data = await fetchTopHeadlines();
    expect(data.articles).toBeDefined();
    expect(data.articles[0].title).toBe("Test Headline");
  });

  it("fetches category news successfully", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ articles: [{ title: "Tech News" }] }));

    const data = await fetchCategoryNews("technology");
    expect(data.articles).toBeDefined();
    expect(data.articles[0].title).toBe("Tech News");
  });

  it("fetches search results successfully", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ articles: [{ title: "Search Result" }] }));

    const data = await searchNews("React");
    expect(data.articles).toBeDefined();
    expect(data.articles[0].title).toBe("Search Result");
  });

  it("handles API failure gracefully", async () => {
    fetchMock.mockReject(new Error("Failed to fetch"));

    await expect(fetchTopHeadlines()).rejects.toThrow("Failed to fetch");
  });
});
