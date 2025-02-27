import { render, screen, waitFor, act } from "@testing-library/react";
import TopHeadline from "../../components/TopHeadline";
import { fetchTopHeadlines, fetchCategoryNews } from "../../api/news/route";
import "@testing-library/jest-dom";

// Mock API calls
jest.mock("../../api/news/route", () => ({
    fetchTopHeadlines: jest.fn(),
    fetchCategoryNews: jest.fn(),
}));

const mockArticles = {
    articles: [
        {
            source: { id: "bbc-news", name: "BBC News" },
            author: "John Doe",
            title: "Test Headline",
            description: "This is a test description.",
            url: "https://example.com/test-article",
            urlToImage: "https://example.com/test-image.jpg",
            publishedAt: "2024-02-15T12:00:00Z",
            content: "Test content",
        },
    ],
};

describe("TopHeadline Component", () => {
    it("fetches and displays top headlines", async () => {
        (fetchTopHeadlines as jest.Mock).mockResolvedValue(mockArticles);

        await act(async () => {
            render(<TopHeadline category="general" />);
        });

        await waitFor(() => {
            expect(screen.getByText("Test Headline")).toBeInTheDocument();
            expect(screen.getByText("This is a test description.")).toBeInTheDocument();
        });
    });

    it("fetches and displays category news", async () => {
        (fetchCategoryNews as jest.Mock).mockResolvedValue(mockArticles);

        await act(async () => {
            render(<TopHeadline category="technology" />);
        });

        await waitFor(() => {
            expect(screen.getByText("Test Headline")).toBeInTheDocument();
        });
    });

    it("handles API failure gracefully", async () => {
        (fetchTopHeadlines as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

        await act(async () => {
            render(<TopHeadline category="general" />);
        });

        await waitFor(() => {
            expect(screen.queryByText("Test Headline")).not.toBeInTheDocument();
        });
    });
});
