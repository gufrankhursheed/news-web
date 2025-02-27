import { render, screen } from "@testing-library/react";
import Article from "../../components/Article";
import "@testing-library/jest-dom";

const mockArticle = {
    source: { id: "bbc-news", name: "BBC News" },
    author: "John Doe",
    title: "Test Article Title",
    description: "This is a test description for the article.",
    url: "https://example.com/test-article",
    urlToImage: "https://example.com/test-image.jpg",
    publishedAt: "2024-02-15T12:00:00Z",
    content: "This is a test content."
};

describe("Article Component", () => {
    it("renders article details correctly", () => {
        render(<Article data={mockArticle} />);

        const titleElement = screen.getByText("Test Article Title");
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.closest("a")).toHaveAttribute("href", mockArticle.url);

        expect(screen.getByText("This is a test description for the article.")).toBeInTheDocument();

        expect(screen.getByText("BBC News")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();

        expect(screen.getByText("Thu Feb 15 2024")).toBeInTheDocument();
    });

    it("renders correctly when `author` is missing", () => {
        const articleWithoutAuthor = { ...mockArticle, author: "" }; // ✅ Simulate missing author
        render(<Article data={articleWithoutAuthor} />);
    
        expect(screen.queryByText("John Doe")).not.toBeInTheDocument(); // ✅ Ensure author is NOT rendered
    });
});

