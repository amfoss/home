import Image from "next/image";
import logo from "../../public/amfoss-logo-white.png"
import amfoss from "../../public/amfoss-footer-black@3x.png"
import { Github } from 'lucide-react';
import LampContainer from "../components/lamp"
import Link from "next/link";
import { config } from "@/lib/config";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div>
        <LampContainer>
          <p></p>
        </LampContainer>
        <div>
          <div className="absolute flex justify-between items-center w-full top-4 md:top-6 lg:top-[4vh] px-4 md:px-0">
            <Image className="relative w-12 md:w-16 lg:max-w-[3.5vw] md:left-4 lg:left-[2vw]" src={logo} alt="logo" priority />
            <p className="relative text-white font-[1000] text-2xl md:text-3xl lg:text-[3.5vh] right-4 md:right-8 lg:right-[4vw]">H<span className="text-primaryYellow">&lt;&gt;</span>ME</p>
          </div>
          <p className="absolute top-[42%] md:top-[38%] lg:top-[40vh] left-0 w-full animate-fadeInUp text-3xl md:text-5xl lg:text-[3vw] text-white font-bold opacity-0 px-4" style={{ textAlign: "center" }}>India&apos;s Leading FOSS Club</p>
          <Image className="absolute animate-fadeInUp w-56 md:w-72 lg:max-w-[20vw] left-1/2 -translate-x-1/2 top-[50%] md:top-[47%] lg:top-[48vh] opacity-0" src={amfoss} alt="amfoss" />
          <Link
            href={config.githubAuthUrl}
            className="absolute animate-fadeInUp text-center font-semibold text-black 
                    px-6 md:px-8 lg:px-6 py-3 md:py-4 lg:py-3
                    text-lg md:text-xl lg:text-xl
                    w-auto min-w-[200px] md:min-w-[240px]
                    bg-primaryYellow hover:bg-yellow-500 transition-colors duration-300
                    rounded-lg md:rounded-xl lg:rounded-xl
                    top-[62%] md:top-[58%] lg:top-[58vh] 
                    left-1/2 transform -translate-x-1/2
                    opacity-0 shadow-lg hover:shadow-xl
                    flex items-center justify-center gap-3"
          >
            <Github className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 flex-shrink-0" />
            <span className="whitespace-nowrap">Sign in</span>
          </Link>

        </div>
      </div>
    </main>
  );
}
