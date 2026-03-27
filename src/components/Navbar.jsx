import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-[90%] max-w-5xl ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border border-primary/10 text-primary shadow-lg' : 'bg-transparent text-background border border-transparent'
      }`}
    >
      <div className="font-heading font-extrabold tracking-tight text-xl uppercase">
        Growth Lab
      </div>
      
      <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm tracking-wide">
        <a href="#features" className="hover:-translate-y-[1px] transition-transform">Features</a>
        <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
        <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Protocol</a>
        <a href="#about" className="hover:-translate-y-[1px] transition-transform">About</a>
      </div>

      <MagneticButton 
        onClick={() => window.location.href = 'mailto:growthlab.jr@gmail.com'} 
        className={isScrolled ? 'bg-accent text-primary border-transparent px-6 py-2 rounded-full font-sans font-semibold text-sm' : 'bg-background text-primary border-transparent px-6 py-2 rounded-full font-sans font-semibold text-sm'}
      >
        Contact Me
      </MagneticButton>
    </nav>
  );
}
