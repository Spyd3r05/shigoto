import {Briefcase} from "lucide-react"
import Image from "next/image"
import Chibi from "../../public/Chibi.jpg"

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4 fixed top-0 w-full z-10">
            <div className="flex items-center space-x-2 text-[#4b9b9b]">
                <Briefcase size={24} className="fill-current" />
                <span className="text-xl font-bold tracking-tight">SHIGOTO</span>
            </div>
            <div className="flex items-center space-x-6">
                <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center overflow-hidden">
                    <Image
                        src={Chibi}
                        width={200}
                        height={200}
                        alt='Profile Image'
                        className="rounded-full"
                    />
                </div>
            </div>
        </nav >
    )
}

export default Navbar
