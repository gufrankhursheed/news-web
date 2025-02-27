const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async (page = 1) => {
    const res = await fetch(`${BASE_URL}/top-headlines?country=us&page=${page}&pageSize=10&apiKey=${API_KEY}`);
    return res.json();
}

export const fetchCategoryNews = async (category: string, page = 1) => {
    const res = await fetch(`${BASE_URL}/top-headlines?category=${category}&country=us&page=${page}&pageSize=10&apiKey=${API_KEY}`);
    return res.json();
}

export const searchNews = async (query: string, page: number = 1) => {
    const res = await fetch(`${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}&pageSize=10&page=${page}`);
    return res.json();
};