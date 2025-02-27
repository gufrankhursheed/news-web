import Link from "next/link";
import Tag from "./Tag";
import Image from "next/image";

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

export default function RandomArticle({ data }: { data: Article }) {
    return (
        <div className='flex justify-between gap-2 p-2 px-4 mb-4 border-b border-gray-300'>
            <div>
                <Link href={data?.url} className="font-bold text-lg hover:text-gray-700 hover:underline">{data?.title}</Link>
                <div className='flex flex-col space-y-2 max-w-max my-2'>
                    <Tag data={data?.source.name} />
                    <Tag data={new Date(data?.publishedAt).toDateString()} />
                </div>
            </div>
            <div className='relative w-[400px] h-[200px]'>
                <Image src={data?.urlToImage ? data.urlToImage : "/newslogo.jpg"} alt={data?.title} fill className='object-cover' />
            </div>
        </div>
    )
}