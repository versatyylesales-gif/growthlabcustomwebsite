import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Deep Empathy', detail: 'Understanding the physical and mental toll of recovery.' },
    { id: 2, title: 'Reclaiming Confidence', detail: 'Rebuilding trust in your body\'s true capabilities.' },
    { id: 3, title: 'Injury & Healing', detail: 'Guided entirely by lived experience.' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      {cards.map((card, i) => {
        const isTop = i === 2;
        const isMiddle = i === 1;
        // isBottom is automatically 0

        return (
          <div
            key={card.id}
            className="absolute w-full max-w-[280px] bg-background border border-primary/10 rounded-[2rem] p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: `translateY(${isTop ? 0 : isMiddle ? 16 : 32}px) scale(${isTop ? 1 : isMiddle ? 0.95 : 0.9})`,
              zIndex: isTop ? 30 : isMiddle ? 20 : 10,
              opacity: isTop ? 1 : isMiddle ? 0.8 : 0.5,
            }}
          >
            <h4 className="font-heading font-bold text-lg mb-2 text-primary">{card.title}</h4>
            <p className="font-sans text-sm text-primary/70">{card.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

function TelemetryTypewriter() {
  const fullText = "Focusing on individualized mobility, activation, and alignment to support peak performance...";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setText("");
        setIndex(0);
      }, 4000);
      return () => clearTimeout(reset);
    }
  }, [index, fullText]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
        <span className="font-data text-xs text-primary/60 uppercase tracking-widest">Live Feed</span>
      </div>
      <p className="font-data text-sm md:text-base leading-relaxed text-primary">
        {text}
        <span className="inline-block w-[0.6em] h-[1.2em] bg-accent ml-1 animate-pulse align-middle"></span>
      </p>
    </div>
  );
}

function CursorScheduler() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Starting position top-left relative
      gsap.set(cursorRef.current, { x: 0, y: 0, opacity: 0 });

      tl.to(cursorRef.current, { opacity: 1, duration: 0.3, delay: 0.5 })
        // Move to Thursday (index 4 in top section)
        .to(cursorRef.current, { x: 140, y: 40, duration: 1.2, ease: 'power2.inOut' })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => setActiveDay(4))
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        // Move to save button
        .to(cursorRef.current, { x: 90, y: 120, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => setSaved(true))
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.8 })
        .call(() => {
          setActiveDay(null);
          setSaved(false);
          gsap.set(cursorRef.current, { x: 0, y: 0 });
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full flex flex-col items-center justify-center p-4">
      <div className="flex flex-wrap justify-center gap-2 mb-8 w-full">
        {days.map((d, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-center w-8 h-8 rounded-full font-data text-xs transition-colors duration-300 ${activeDay === i ? 'bg-accent text-primary font-bold' : 'bg-primary/5 text-primary/40'}`}
          >
            {d}
          </div>
        ))}
      </div>
      
      <button className={`px-6 py-2 rounded-full font-sans text-sm font-semibold transition-colors duration-300 ${saved ? 'bg-accent text-primary' : 'bg-primary text-background'}`}>
        {saved ? 'Saved' : 'Save'}
      </button>

      {/* SVG Cursor from Lucide essentially or raw SVG */}
      <svg 
        ref={cursorRef}
        className="absolute top-2 left-2 w-6 h-6 z-50 drop-shadow-md"
        style={{ pointerEvents: 'none' }}
        viewBox="0 0 24 24"
      >
        <path d="M5.5 3.21V20.8C5.5 21.43 6.24 21.76 6.71 21.34L11.43 17.2L14.71 23.47C14.88 23.8 15.28 23.94 15.61 23.77L18.15 22.44C18.48 22.27 18.62 21.87 18.45 21.54L15.22 15.34H20.52C21.14 15.34 21.48 14.6 21.06 14.15L6.56 2.65C6.15 2.21 5.5 2.5 5.5 3.21Z" fill="#1A1A1A" stroke="#E8E1D5" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-32 px-6 md:px-16 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-background border border-primary/10 rounded-[3rem] p-8 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-extrabold text-2xl">Lived Experience</h3>
            <p className="font-sans text-sm text-primary/70">Driven by severe injury and recovery.</p>
          </div>
          <div className="flex-1 min-h-[250px] flex items-center justify-center">
            <DiagnosticShuffler />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-background border border-primary/10 rounded-[3rem] p-8 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-extrabold text-2xl">Telemetry</h3>
            <p className="font-sans text-sm text-primary/70">Elite Precision & Mobility.</p>
          </div>
          <div className="flex-1 bg-primary/5 rounded-[2rem] p-6">
            <TelemetryTypewriter />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-background border border-primary/10 rounded-[3rem] p-8 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-extrabold text-2xl">Consistent Recovery</h3>
            <p className="font-sans text-sm text-primary/70">Supportive partnerships.</p>
          </div>
          <div className="flex-1 bg-primary/5 rounded-[2rem] p-6 overflow-hidden">
            <CursorScheduler />
          </div>
        </div>

      </div>
    </section>
  );
}
