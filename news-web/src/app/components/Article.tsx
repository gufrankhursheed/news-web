import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";

interface Source {
    id: string;
    name: string
}

interface ArticleData {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string
}

export default function Article({ data }: { data: ArticleData }) {
    return (
        <div className="my-5 py-2 border-b border-gray-300">
            <div className="my-2 relative w-full h-[350px]">
                <Image src={data?.urlToImage ? data.urlToImage : "/newslogo.jpg"} alt="Article Image" fill sizes="(max-width:768px) 50vw, (max-width:1200px) 100vw, 100vw" className="object-cover rounded-sm" />
            </div>
            <Link href={data?.url} className="font-bold text-2xl hover:text-gray-700 hover:underline">{data?.title}</Link>
            <div className="flex space-x-4 my-2">
                <Tag data={data?.source.name} />
                {data?.author ? <Tag data={data?.author} /> : null}
                <Tag data={new Date(data?.publishedAt).toDateString()} />
            </div>
            <p className="text-sm">{data?.description}</p>
        </div>
    )
}