import Image from "next/image";
import logo from "../../public/amfoss-logo-white.png"
import amfoss from "../../public/amfoss-footer-black@3x.png"
import LampContainer from "../components/lamp"

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
          <p className="relative right-[4vw] text-white font-[1000] lg:text-[3.5vh] md:text-[8vh] sm:text-[5vw]">H<span className="text-yellow-800">&lt;&gt;</span>ME</p>
        </div>
        <p className="absolute lg:top-[45vh] md:top-[35vh] sm:top-[42.5vh] left-[0vw] w-[100vw] animate-fadeInUp lg:text-[3vw] md:text-[4vw] sm:text-[7vw] text-white font-bold opacity-0" style={{ textAlign: "center" }}>India's Leading FOSS Club</p>
        <Image className="absolute animate-fadeInUp lg:max-w-[20vw] md:max-w-[25vw] sm:max-w-[43vw] lg:left-[40vw] md:left-[38vw] sm:left-[28vw] lg:top-[52.5vh] sm:top-[48.3vh] opacity-0" src={amfoss} alt="amfoss" />
        <button className="absolute animate-fadeInUp text-center lg:text-[2.5vh] md:text-xl sm:text-2xl text-black lg:w-[15vw] sm:w-[34vw] md:w-[15vw] sm:h-[4.8vh] lg:h-[5.5vh] md:h-[10vh] bg-yellow-400 lg:rounded-[0.5rem] md:rounded-[0.7rem] sm:rounded-[1rem] font-bold lg:top-[70vh] md:top-[75vh] sm:top-[60vh] lg:left-[43vw] md:left-[43vw] sm:left-[33vw] opacity-0">Sign in</button>
        </div>
      </div>
    </main>
  );
}
