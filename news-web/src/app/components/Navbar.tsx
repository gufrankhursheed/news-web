import Link from "next/link";

export default function Navbar() {
    return(
        <nav>
            <ul className="py-2 px-7 border-t border-gray-300">
                <li className="my-2 space-x-7 text-lg font-bold">
                    <Link href="/world">World</Link>
                    <Link href="/business">Business</Link>
                    <Link href="/science">Science</Link>
                    <Link href="/health">Health</Link>
                    <Link href="/sports">Sports</Link>
                    <Link href="/books">Books</Link>
                    <Link href="/lifestyle">Lifestyle</Link>
                    <Link href="/food">Food</Link>
                    <Link href="/travel">Travel</Link>
                </li>
            </ul>
        </nav>
    )
}