import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

export default function Hero({ onBookClick }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-text', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.reveal-btn', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2669&auto=format&fit=crop')" }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-start gap-6">
        <h1 className="flex flex-col text-background">
          <span className="reveal-text font-heading font-extrabold text-4xl md:text-6xl tracking-tight uppercase">
            Reclaim your confidence is the
          </span>
          <span className="reveal-text font-drama italic font-light text-6xl md:text-[8rem] leading-none mt-2">
            Elite precision.
          </span>
        </h1>

        <p className="reveal-text font-data text-background/80 text-xs md:text-sm tracking-widest uppercase max-w-xl leading-relaxed">
          Personal Trainer • CPT • NASM • Certified Assisted Stretch Specialist • FRC Mobility Specialist
        </p>

        <div className="reveal-btn mt-4">
          <MagneticButton 
            onClick={onBookClick} 
            className="bg-accent text-primary text-lg px-10 py-5 rounded-[2rem]"
          >
            Book a Consultation
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
