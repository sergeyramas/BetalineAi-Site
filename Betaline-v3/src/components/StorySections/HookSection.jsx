import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HookSection = () => {
  return (
    <section id="about" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '7rem 1.5rem 4rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-accent) 100%)'
    }}>
      <motion.div
        style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 10 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <span style={{
          display: 'inline-block',
          padding: '0.5rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(217, 119, 6, 0.1)',
          border: '1px solid rgba(217, 119, 6, 0.2)',
          color: 'var(--accent-amber)',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          marginBottom: '2rem',
          textTransform: 'uppercase'
        }}>
          Для владельцев бизнеса
        </span>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          marginBottom: '1.5rem',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)'
        }}>
          Давай начистоту.{' '}
          <span className="text-gradient-warm">Как обстоят дела сейчас?</span>
        </h1>

        <motion.p
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.7
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          Мир меняется быстрее, чем ты успеваешь обновлять регламенты. Пока мы говорим, нейросети уже забирают рутину.{' '}
          <strong style={{ color: 'var(--text-primary)' }}>Но те, кто перешел на ИИ — уже в космосе.</strong>
        </motion.p>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        style={{ marginTop: '3rem', position: 'relative', zIndex: 10, width: '100%', maxWidth: '650px' }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <img
          src="/images/hero.png"
          alt="AI бизнес экосистема"
          className="section-image"
          style={{ width: '100%', maxWidth: '650px', margin: '0 auto', display: 'block' }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'var(--text-muted)',
          cursor: 'pointer'
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Листай дальше
        </span>
        <ChevronDown size={22} />
      </motion.div>
    </section>
  );
};

export default HookSection;
