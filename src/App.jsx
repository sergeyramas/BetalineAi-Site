import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Cases from './components/Cases';
import ChatDemo from './components/ChatDemo';
import Footer from './components/Footer';
import Popup from './components/Popup';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    if (mediaQuery.matches) {
      setTheme('light');
    }
  }, []);

  return (
    <div className="app-container">
      {/* Background ambients */}
      <div className="bg-glow" style={{ top: '-10%', left: '-10%' }}></div>
      <div className="bg-glow-purple" style={{ bottom: '20%', right: '-5%' }}></div>
      <div className="bg-glow" style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }}></div>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main>
        {/* 1. Hero with inline chat */}
        <Hero />
        {/* 2. Features / niches / 3 steps */}
        <Features />
        {/* 3. Cases — beauty salon case */}
        <Cases />
        {/* 4. Live chat demo with businessman background */}
        <ChatDemo />
      </main>

      <Footer />
      <Popup />
    </div>
  );
}

export default App;
