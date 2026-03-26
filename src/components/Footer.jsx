import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-[10] w-full bg-primary text-background rounded-t-[4rem] px-8 py-16 md:py-24 mt-20 flex flex-col justify-between min-h-[50vh]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 mb-24">
        
        <div className="flex flex-col items-start gap-4">
          <h3 className="font-heading font-extrabold text-3xl uppercase tracking-tight">Growth Lab</h3>
          <p className="font-sans text-background/60 text-lg max-w-xs">
            It's way beyond sports. This is a way of life.
          </p>
        </div>

        <div className="flex flex-col gap-4 font-sans text-background/80">
          <h4 className="font-heading font-semibold text-background mb-2">Navigation</h4>
          <a href="#features" className="hover:text-accent transition-colors">Features</a>
          <a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a>
          <a href="#protocol" className="hover:text-accent transition-colors">Protocol</a>
        </div>

        <div className="flex flex-col gap-4 font-sans text-background/80">
          <h4 className="font-heading font-semibold text-background mb-2">Legal</h4>
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent transition-colors">Contact</a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t border-background/10 pt-8">
        <p className="font-sans text-sm text-background/40">
          &copy; {new Date().getFullYear()} Growth Lab by Jay Roman. All rights reserved.
        </p>

        <div className="flex items-center gap-3 bg-background/5 px-4 py-2 rounded-full border border-background/10">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A5C4A3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A5C4A3]"></span>
          </div>
          <span className="font-data text-xs uppercase tracking-widest text-background/80">System Operational</span>
        </div>
      </div>
    </footer>
  );
}
