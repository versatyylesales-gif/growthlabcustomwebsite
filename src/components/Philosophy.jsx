import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  const line1 = "Most training focuses on: generic reps and chasing sweat.".split(" ");
  const line2 = "We focus on: leaving people better than how we found them.".split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.to(imageRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(imageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      gsap.from(".word-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ".text-container",
          start: "top 75%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="relative w-full py-40 md:py-56 bg-primary overflow-hidden flex items-center justify-center rounded-[3rem] max-w-[98%] mx-auto my-12">
      <div 
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center opacity-20 scale-110 will-change-transform"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2669&auto=format&fit=crop')" }}
      />
      
      <div className="relative z-10 text-container flex flex-col items-center text-center px-6 max-w-5xl">
        <p className="font-heading text-background/60 text-lg md:text-2xl mb-6 md:mb-10 flex flex-wrap justify-center gap-[0.3em]">
          {line1.map((word, i) => (
            <span key={'l1'+i} className="word-reveal overflow-hidden relative inline-block">{word}</span>
          ))}
        </p>
        <h2 className="font-drama italic text-background text-4xl md:text-7xl lg:text-[5.5rem] leading-[1.1] flex flex-wrap justify-center gap-[0.25em]">
          {line2.map((word, i) => {
            const isAccent = word.toLowerCase() === "better";
            return (
              <span key={'l2'+i} className={`word-reveal overflow-hidden relative inline-block ${isAccent ? 'text-accent font-sans not-italic font-bold px-2' : ''}`}>
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
