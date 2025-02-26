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

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = category === "general" ? await fetchTopHeadlines() : await fetchCategoryNews(category)
                setArticles(data.articles)
            } catch (error) {
                console.log("News Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        }

        loadNews();
    }, [category])

    if (loading) {
        return (
            <div className='flex items-center justify-center w-[700px]'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="w-[700px]">
            {articles.map((article, index) => (
                <div key={index}>
                    <Article data={article} />
                </div>
            ))}
        </div>
    )
}