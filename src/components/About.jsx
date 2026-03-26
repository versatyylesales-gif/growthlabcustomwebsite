import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import jayRomanImg from '../JAY ROMAN CLOSEUP IMAGE.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop Parallax
        gsap.utils.toArray('.parallax-img').forEach(img => {
          gsap.to(img, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile Parallax (Lighter)
        gsap.utils.toArray('.parallax-img').forEach(img => {
          gsap.to(img, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      });

      // Text Fade-up
      gsap.utils.toArray('.editorial-text').forEach(text => {
        gsap.from(text, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%'
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative z-[10] py-32 md:py-48 px-6 bg-background">
      <div className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-24">

        <div className="flex flex-col gap-6 items-center text-center editorial-text">
          <span className="font-data text-accent text-sm tracking-widest uppercase">The Journey</span>
          <h2 className="font-heading font-extrabold text-5xl md:text-7xl text-primary">About Jay.</h2>
        </div>

        <div className="font-drama text-2xl md:text-4xl leading-relaxed text-primary editorial-text">
          <span className="float-left text-7xl md:text-8xl text-accent leading-none pr-4 font-bold">I</span>
          t started with a severe injury. A moment that stripped away everything I thought I knew about my body, my identity, and my capabilities. When you hit rock bottom physically, you quickly realize that standard recovery isn't enough.
        </div>

        <div className="w-full relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden">
          <img
            src={jayRomanImg}
            alt="Jay Roman coaching"
            className="parallax-img absolute inset-0 w-full h-[120%] object-cover -top-[10%] will-change-transform"
          />
        </div>

        <div className="font-sans text-lg md:text-xl text-primary/80 leading-loose editorial-text pl-0 md:pl-20">
          <p className="mb-8">
            The road back wasn't just about physical rehabilitation. It was about reclaiming trust. Discovering what it actually takes to heal, move, and perform at the highest level again. It required deep empathy—the kind you only get from lived experience.
          </p>
          <p>
            I realized that athletes don't just need a trainer; they need a partner. Someone who understands the physical and mental toll of recovery. That's why I created Growth Lab.
          </p>
        </div>

        <div className="font-drama italic text-3xl md:text-5xl text-center leading-tight text-primary editorial-text my-8 px-4">
          "Now, I use that lived experience to help athletes build unshakable foundations. Because people need people, period."
        </div>

        <div className="w-full relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden scale-[0.98] md:scale-[0.95]">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2620&auto=format&fit=crop"
            alt="Mobility and activation"
            className="parallax-img absolute inset-0 w-full h-[120%] object-cover -top-[10%] will-change-transform"
          />
        </div>

        {/* Bio Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16 pt-12 md:pt-16 editorial-text border-t border-primary/10 mt-8">
          <div className="w-full md:w-2/5 shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[4/5] relative">
            <img
              src={jayRomanImg}
              alt="Jay Roman Portrait"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-3/5 font-sans text-lg md:text-xl text-primary/80 leading-relaxed flex flex-col gap-6 pt-4">
            <h3 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-2">The Standard.</h3>
            <p>
              Jay Roman is a performance coach specializing in strength, mobility, and human movement, known for integrating the FRC (Functional Range Conditioning) system with functional strength training to build resilience, control, and power.
            </p>
            <p>
              She works with high level athletes and individuals in high performance environments, focusing on developing capacity from the inside out, prioritizing joint health, movement efficiency, and sustainable strength.
            </p>
            <p>
              Growth Lab is her performance brand built to deliver that standard at scale, providing structured training, recovery, and education designed to help people move better, perform at a higher level, and maintain it long term.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
