import Image from 'next/image';
import { Orbitron } from 'next/font/google';
import localFont from 'next/font/local';

const orbitron = Orbitron({ subsets: ['latin'] });
const brushFont = localFont({ src: '../../public/fonts/road-rage/road-rage.woff2' });

export default function AboutSaya() {
  return (
    <section id="aboutsaya" className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-8">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/aboutsaya.svg"
          alt="Dark Cyberpunk Smoke Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* NAVBAR */}
      {/* <header className={`relative z-30 flex justify-between items-center w-full ${orbitron.className}`}>
        <div className="text-white font-bold tracking-wider text-xl">SAYALABS</div>
        <nav className="hidden md:flex space-x-8 text-gray-400 text-xs tracking-widest uppercase">
          <a href="#" className="hover:text-white transition">Mastery</a>
          <a href="#" className="hover:text-white transition">The Path</a>
          <a href="#" className="hover:text-white transition">Job Openings</a>
          <a href="#" className="hover:text-white transition">Conferences</a>
        </nav>
        <button className="border border-red-600/50 bg-red-950/30 text-white px-6 py-2 text-xs uppercase tracking-widest rounded hover:bg-red-600 transition">
          Contact Us
        </button>
      </header> */}

      {/* THE TYPOGRAPHY LAYER */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <h1 className={`${brushFont.className} text-[12vw] text-white/90 text-center leading-none tracking-tight uppercase select-none`}>
        SAYALABS <br /> DIGITAL CRAFT
        </h1>
      </div>

      {/* 3D Samurai model renders here via the fixed SamuraiScene overlay — no 2D image needed */}

      {/* FOOTER STATS & SOCIALS */}
      <footer className={`relative z-30 flex justify-between items-end w-full ${orbitron.className}`}>
        <div className="flex space-x-12 text-white">
          <div>
            <div className="text-3xl font-bold">250+</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Partners Worldwide</div>
          </div>
          <div>
            <div className="text-3xl font-bold">20+</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Team Members</div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          {['fb', 'yt', 'github'].map((icon) => (
            <div key={icon} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 backdrop-blur-sm hover:bg-red-600 transition cursor-pointer">
              <span className="text-xs uppercase">{icon}</span>
            </div>
          ))}
        </div>
      </footer>
    </section>
  );
}