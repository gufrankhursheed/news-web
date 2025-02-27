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

    useEffect(() => {
        const getNews = async () => {
            try {
                const data = await searchNews(search || "")
                setArticles(data.articles)
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
    }, [search])

    if (loading) {
        return (
            <div className='flex items-center justify-center w-[700px]'>
                <Spinner />
            </div>
        );
    }

    return (
        <div className='w-[700px] mx-7'>
            {articles.map((article, index) => (
                <div key={index}>
                    <Article data={article} />
                </div>
            ))}
        </div>
    )
}
