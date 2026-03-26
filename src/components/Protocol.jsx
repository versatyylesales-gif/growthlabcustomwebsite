import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { 
    id: '01', 
    title: 'The Origin', 
    desc: 'Understanding the body on a deeper level—what it needs to heal, move, and perform.',
    SvgContent: () => (
      <svg className="w-full h-full text-accent spinning-motif" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="50" cy="50" r="40" strokeDasharray="4 6" />
        <circle cx="50" cy="50" r="28" strokeDasharray="2 4" opacity="0.6" />
        <circle cx="50" cy="50" r="16" strokeDasharray="1 4" opacity="0.3" />
        <line x1="10" y1="50" x2="90" y2="50" opacity="0.2" />
        <line x1="50" y1="10" x2="50" y2="90" opacity="0.2" />
      </svg>
    )
  },
  { 
    id: '02', 
    title: 'The Foundation', 
    desc: 'For an athlete to thrive at the highest level, they need high-quality relationships and the support of a coach.',
    SvgContent: () => (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 opacity-20 p-4">
          {Array.from({length: 36}).map((_, i) => <div key={i} className="bg-primary rounded-sm" />)}
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_rgba(165,196,163,0.8)] scanning-laser" />
      </div>
    )
  },
  { 
    id: '03', 
    title: 'The Peak', 
    desc: 'Trust-based partnerships rooted in detail, support, and the drive to stay at the top. (Madeline Cooper case study)',
    SvgContent: () => (
      <svg className="w-full h-full text-accent ekg-path" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 0 25 L 20 25 L 25 10 L 30 40 L 35 25 L 60 25 L 65 15 L 70 30 L 75 25 L 100 25" />
      </svg>
    )
  }
];

export default function Protocol() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".spinning-motif", { rotation: 360, duration: 24, repeat: -1, ease: "none" });
      gsap.fromTo(".scanning-laser", { y: '0%' }, { y: '280px', duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.fromTo(".ekg-path path", 
        { strokeDasharray: 200, strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 2.5, repeat: -1, ease: "power1.inOut" }
      );

      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          endTrigger: ".protocol-container",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });

        if(index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.5,
            filter: "blur(10px)",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 80%",
              end: "top 10%",
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" className="protocol-container relative w-full bg-background" ref={containerRef}>
      {steps.map((step, i) => (
        <div 
          key={i} 
          className="protocol-card w-full h-[90vh] flex flex-col md:flex-row items-center justify-center p-6 md:p-16 bg-background rounded-[3rem] border border-primary/10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] absolute will-change-transform"
          style={{ top: `${i * 100}vh`, zIndex: i + 1 }}
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <span className="font-data text-accent text-lg md:text-2xl">[{step.id}]</span>
              <h3 className="font-heading font-extrabold text-4xl md:text-6xl tracking-tight">{step.title}</h3>
              <p className="font-sans text-lg md:text-xl text-primary/70 leading-relaxed max-w-md">{step.desc}</p>
            </div>
            <div className="w-full md:w-1/2 h-[300px] md:h-[450px] flex items-center justify-center bg-primary/5 rounded-[3rem] p-8 md:p-16 overflow-hidden">
              <step.SvgContent />
            </div>
          </div>
        </div>
      ))}
      {/* Spacer to allow scrolling through absolute cards */}
      <div style={{ height: `${steps.length * 100}vh` }}></div>
    </section>
  );
}
