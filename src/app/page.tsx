import Image from "next/image";
import logo from "../../public/amfoss-logo-white.png"
import amfoss from "../../public/amfoss-footer-black@3x.png"
import { Github } from 'lucide-react';
import LampContainer from "../components/lamp"
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div>
        <LampContainer>
          <p></p>
        </LampContainer>
        <div>
        <div className="absolute flex justify-between items-center w-full lg:top-[4vh] sm:top-[3vh]">
          <Image className="relative lg:max-w-[3.5vw] md:max-w-[3.5vw] sm:max-w-[10vw] lg:left-[2vw] sm:left-[2.5vw]" src={logo} alt="logo" priority />
          <p className="relative right-[4vw] text-white font-[1000] lg:text-[3.5vh] md:text-[4vh] sm:text-[5vw]">H<span className="text-primaryYellow">&lt;&gt;</span>ME</p>
        </div>
        <p className="absolute lg:top-[45vh] md:top-[35vh] sm:top-[42.5vh] left-[0vw] w-[100vw] animate-fadeInUp lg:text-[3vw] md:text-[6vw] sm:text-[7vw] text-white font-bold opacity-0" style={{ textAlign: "center" }}>India's Leading FOSS Club</p>
        <Image className="absolute animate-fadeInUp lg:max-w-[20vw] md:max-w-[40vw] sm:max-w-[43vw] lg:left-[40vw] md:left-[30vw] sm:left-[28vw] lg:top-[52.5vh] sm:top-[48.3vh] opacity-0" src={amfoss} alt="amfoss" />
        <Link 
          href="https://root.amfoss.in/auth/github"
          className="absolute animate-fadeInUp text-center font-semibold text-black 
                    lg:px-6 md:px-5 sm:px-4 lg:py-3 md:py-2.5 sm:py-2
                    lg:text-xl md:text-lg sm:text-base
                    lg:w-auto md:w-auto sm:w-auto max-w-[90%] truncate
                    bg-primaryYellow hover:bg-yellow-500 transition-colors duration-300
                    lg:rounded-xl md:rounded-lg sm:rounded-md
                    lg:top-[70vh] md:top-[75vh] sm:top-[60vh] 
                    left-1/2 transform -translate-x-1/2
                    opacity-0 shadow-lg hover:shadow-xl
                    flex items-center justify-center gap-3"
        >
          <Github className="lg:w-6 lg:h-6 md:w-5 md:h-5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="whitespace-nowrap">Sign in</span>
        </Link>
        
        </div>
      </div>
    </main>
  );
}
