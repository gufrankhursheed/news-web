import Image from "next/image";
import Link from "next/link";
import newsLogo from "../../../public/newslogo.jpg"

export default function Header() {
    return (
        <div className="flex justify-between items-center py-1">
            <Link href="/">
                <div className="relative w-[200px] h-[50px] px-3">
                    <Image src={newsLogo} alt="News Logo" width={200} height={200} />
                </div>
            </Link>

        </div>
    )
}