"use client";

import Image from "next/image";
import logo from "../../public/amfoss-logo-white.png"
import amfoss from "../../public/amfoss-footer-black@3x.png"
import { Github } from 'lucide-react';
import LampContainer from "../components/lamp"
import { AuthService } from "@/services/authentication-service";


export default function Home() {
  return (
    <main>
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
        <button onClick={() => AuthService.loginWithGitHub()} className="absolute animate-fadeInUp text-center pt-1 pb-1 font-semibold lg:text-[2.5vh] md:text-3xl sm:text-xl text-black lg:w-[12vw] sm:w-[38vw] md:w-[28vw] bg-yellow-400 lg:rounded-[0.7rem] md:rounded-[0.5rem] sm:rounded-[1rem] lg:top-[70vh] md:top-[75vh] sm:top-[60vh] lg:left-[44vw] md:left-[36vw] sm:left-[33vw] opacity-0 flex items-center justify-center gap-4"><Github />Sign in</button>
        </div>
      </div>
    </main>
  );
}
