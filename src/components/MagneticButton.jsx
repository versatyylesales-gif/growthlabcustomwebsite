import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick }) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(button, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
      const yTo = gsap.quickTo(button, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });
      
      button.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = button.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.3);
        yTo(y * 0.3);
      });

      button.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
      });

      // Hover effect for background span
      button.addEventListener('mouseenter', () => {
        gsap.to(bgRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(bgRef.current, { y: '100%', duration: 0.4, ease: 'power2.out' });
      });
    }, buttonRef);
    return () => ctx.revert();
  }, []);

  return (
    <button 
      ref={buttonRef}
      onClick={onClick}
      className={`relative overflow-hidden rounded-full font-sans font-semibold border border-primary/20 px-8 py-4 transition-transform hover:scale-[1.03] ${className}`}
      style={{ zIndex: 10 }}
    >
      <span 
        ref={bgRef} 
        className="absolute inset-0 bg-primary translate-y-full -z-10 rounded-full"
      ></span>
      <span ref={textRef} className="relative z-10 hover:text-background mix-blend-difference">
        {children}
      </span>
    </button>
  );
}
