"use client";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { searchNews } from "../api/news/route";
import RandomArticle from "./RandonArticle";

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

export default function RandomNews() {
    const [randomArticles, setRandomArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await searchNews("random news")
                setRandomArticles(data.articles)
            } catch (error) {
                console.log("Random News Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        }

        loadNews();
    }, [])

    if (loading) {
        return (
            <div className='flex items-center justify-center w-[450px]'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='mt-4 w-[450px] border-l border-gray-300 mr-5'>
            <h1 className="pl-2 text-2xl font-fold underline">Random News</h1>
            {randomArticles.map((article, index) => (
                <div key={index}>
                    <RandomArticle data={article} />
                </div>
            ))}
        </div>
    )
}