import Image from "next/image";
import Link from "next/link";
import welcome_icon from "../../public/welcome_icon-removebg-preview.png";

export default function Home() {
    return (
        <div className="h-screen relative bg-[linear-gradient(to_bottom,_#000000,_#00007b)] flex flex-col items-center justify-center">
            <div className="flex justify-center text-5xl font-bold text-white mb-[50px]">
                {"Welcome!".split("").map((letter, index) => (
                    <span
                        key={index}
                        className={`inline-block opacity-0 animate-fade-in`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            <Image
                src={welcome_icon}
                alt="Welcome Icon"
<<<<<<< HEAD
                className="h-[500px]"
            />
            <div className="b-1 font-bold text-white bg-green-500 h-[50px] w-[120px] rounded-[20px] flex items-center justify-center cursor-pointer">
                <Link href="/MobileVerification">START</Link>
=======
            />
            <div className="b-1 font-bold text-white absolute bottom-80 bg-green-500 h-[50px] w-[120px] rounded-[20px] mt-[40px] flex items-center justify-center cursor-pointer">
                <Link href="/MobileVerification"><div>START</div></Link>
>>>>>>> c5d8323f865fe6201c0d5b11b5daf6899750ec29
            </div>
        </div>
    );
}
