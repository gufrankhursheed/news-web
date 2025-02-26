import Image from "next/image";
import Link from "next/link";
import newsLogo from "../../../public/newslogo.jpg"

export default function Header() {
    return (
        <div className="flex justify-between items-center">
            <Link href="/">
                <div className="relative w-full h-full px-3">
                    <Image src={newsLogo} alt="News Logo" width={150} height={150} />
                </div>
            </Link>

        </div>
    )
}