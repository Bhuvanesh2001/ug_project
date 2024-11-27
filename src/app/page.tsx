import Image from "next/image";
import Link from "next/link";
import irml from "../../public/irml labs.png";
import welcome_icon from "../../public/s33j47410pBFnrxXC9.gif";

export default function Home() {
    return (
        <div>
            <div className="flex-1">
                    <Image
                        src={irml} alt="irml logo"
                        className="h-[75px] w-fit m-4"
                    />
                    <div className="flex justify-center text-4xl -mt-10">Welcome</div>
            </div>
            <div className="flex flex-col items-center justify-center bg-white overflow-hidden">
                <Image
                    src={welcome_icon}
                    alt="Welcome Icon"
                    className="h-[800px] w-fit -mt-20"
                />
                <div className="b-1 font-bold text-white bg-green-500 h-[50px] w-[120px] rounded-[20px] flex items-center justify-center cursor-pointer -mt-[200px]">
                    <Link href="/MobileVerification">START</Link>
                </div>
            </div>
        </div>
    );
}
