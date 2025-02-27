"use client";

import { useEffect, useState } from "react";
import Article from "./Article";
import { fetchCategoryNews, fetchTopHeadlines } from "../api/news/route";
import Spinner from "./Spinner";

interface TopHeadlineProps {
    category: string;
}

interface Source {
    id: string;
    name: string
}

interface Article {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string
}

export default function TopHeadline({ category }: TopHeadlineProps) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = category === "general" ? await fetchTopHeadlines(page) : await fetchCategoryNews(category, page)
                setArticles(data.articles ?? [])
                setTotalResults(data.totalResults || 0);

                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error) {
                console.log("News Fetch Error:", error);
                setArticles([])
            } finally {
                setLoading(false);
            }
        }

        loadNews();
    }, [category, page])

    const totalPages = Math.ceil(totalResults / 10);

    if (loading) {
        return (
            <div className='flex items-center justify-center w-[700px]'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="w-[750px] mx-2">
            <div>
                {articles.map((article, index) => (
                    <div key={index}>
                        <Article data={article} />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center my-4 space-x-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`px-4 py-2 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page >= totalPages}
                        className={`px-4 py-2 border rounded ${page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    )
}