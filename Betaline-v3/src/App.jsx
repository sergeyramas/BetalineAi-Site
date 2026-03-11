import { useState, useEffect } from 'react';
import Header from './components/Header';
import HookSection from './components/StorySections/HookSection';
import RealitySection from './components/StorySections/RealitySection';
import MathSection from './components/StorySections/MathSection';
import SolutionSection from './components/StorySections/SolutionSection';
import OfferSection from './components/StorySections/OfferSection';
import Footer from './components/Footer';
import Popup from './components/Popup';
import BottomBanner from './components/BottomBanner';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Warm ambient shapes */}
      <div className="bg-warm-circle bg-warm-amber" style={{ top: '-15%', right: '-10%' }}></div>
      <div className="bg-warm-circle bg-warm-emerald" style={{ bottom: '30%', left: '-8%' }}></div>
      <div className="bg-warm-circle bg-warm-amber" style={{ top: '50%', left: '60%' }}></div>

      <Header />

      <main>
        <HookSection />
        <RealitySection />
        <MathSection />
        <SolutionSection />
        <OfferSection />
      </main>

      <Footer />
      <Popup />
      <BottomBanner />
    </div>
  );
}

export default App;
