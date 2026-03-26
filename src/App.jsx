import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import About from './components/About';
import Footer from './components/Footer';
import { PopupModal } from 'react-calendly';

function App() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-primary overflow-x-hidden">
      <Navbar onBookClick={() => setIsCalendlyOpen(true)} />
      <main>
        <Hero onBookClick={() => setIsCalendlyOpen(true)} />
        <Features />
        <Philosophy />
        <Protocol />
        <About />
      </main>
      <Footer />

      <PopupModal
        url="https://calendly.com/jayroman"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById("root")}
      />
    </div>
  );
}

export default App;
