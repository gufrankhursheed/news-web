const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async() => {
    const res = await fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`)
    return res.json()
}

export const fetchCategoryNews = async(category: string) => {
    const res = await fetch(`${BASE_URL}/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`)
    return res.json()
}

export const searchNews = async(query: string) => {
    const res = await fetch(`${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`);
  return res.json();
}