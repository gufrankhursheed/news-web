'use client'

import Article from '../components/Article'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { searchNews } from '../api/news/route';
import Spinner from '../components/Spinner';

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

export default function Search() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const searchParams = useSearchParams()
    const search = searchParams ? searchParams.get('q') : null
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const getNews = async () => {
            try {
                const data = await searchNews(search || "", page);
                setArticles(data.articles)
                setTotalResults(data.totalResults || 0);

                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error) {
                if (typeof error === 'object' && error !== null) {
                    console.log(error.toString());
                } else {
                    console.log('Unexpected error', error);
                }
            } finally {
                setLoading(false);
            }
        }
        getNews()
    }, [search, page])

    const totalPages = Math.ceil(totalResults / 10);

    if (loading) {
        return (
            <div className='flex items-center justify-center w-[700px]'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='w-[700px] mx-7'>
            <h2 className="text-2xl font-bold">Search Results for: {search}</h2>
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
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className={`px-4 py-2 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage(prev => prev + 1)}
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
