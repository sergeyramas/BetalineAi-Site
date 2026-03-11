import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MathSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  return (
    <section id="math" ref={ref} style={{
      padding: '6rem 1.5rem',
      background: 'var(--bg-primary)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Title + Image */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)'
          }}>
            Считаем твои деньги <span style={{ opacity: 0.5 }}>(буквально)</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Вот как выглядит реальная экономика перехода на ИИ-систему.
          </p>
          <img
            src="/images/math.png"
            alt="Экономия с ИИ"
            className="section-image"
            style={{ width: '100%', maxWidth: '420px', margin: '0 auto', display: 'block' }}
          />
        </motion.div>

        {/* Comparison Cards */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Old Way */}
          <div className="card-warm" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem' }}>
              Старый подход
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Отдел (5 человек)</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)' }}>5 × 100 000 ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Налоги и сборы</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)' }}>~40%</span>
              </div>
              <div style={{ borderTop: '2px solid rgba(220, 38, 38, 0.15)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Итого в месяц:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626', fontFamily: 'monospace' }}>700 000 ₽</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                (≈ 8.4 млн ₽ в год)
              </div>
            </div>
          </div>

          {/* AI Way */}
          <div className="card-warm" style={{
            padding: '2.5rem',
            border: '2px solid rgba(5, 150, 105, 0.2)',
            background: 'linear-gradient(145deg, rgba(5, 150, 105, 0.02), var(--bg-secondary))'
          }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--accent-emerald)', borderBottom: '2px solid rgba(5, 150, 105, 0.15)', paddingBottom: '1rem' }}>
              Система ИИ
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Внедрение (разово)</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)' }}>250 000 ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Поддержка/API</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)' }}>50 000 ₽ / мес</span>
              </div>
              <div style={{ borderTop: '2px solid rgba(5, 150, 105, 0.2)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Первый год:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'monospace' }}>850 000 ₽</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                (Вместо 8.4 млн ₽)
              </div>
            </div>
          </div>
        </motion.div>

        {/* Savings Banner */}
        <motion.div
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-2xl)',
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.05), rgba(16, 185, 129, 0.08))',
            border: '1px solid rgba(5, 150, 105, 0.12)'
          }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
            Чистая экономия
          </div>
          <div className="text-gradient-emerald" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em'
          }}>
            &gt; 7 500 000 ₽
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            за один год. Каждый следующий год — экономия еще больше.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MathSection;
