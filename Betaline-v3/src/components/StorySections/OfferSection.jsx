import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const OfferSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' }
    })
  };

  return (
    <section id="offer" ref={ref} style={{
      padding: '6rem 1.5rem',
      background: 'var(--bg-secondary)',
      position: 'relative',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Title + Image */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
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
            Предложение, от которого нельзя отказаться
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 2.5rem' }}>
            Выбирай свой путь к автоматизации. Без агрессивных продаж. Только цифры и факты.
          </p>
          <img
            src="/images/offer.png"
            alt="Предложение"
            className="section-image"
            style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'block' }}
          />
        </motion.div>

        {/* Offer Cards */}
        <div className="offer-grid">

          {/* Card 1 — Audit */}
          <motion.div
            className="card-warm"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderTop: '3px solid var(--accent-amber)'
            }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={1}
          >
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(217, 119, 6, 0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', fontSize: '1.75rem'
            }}>
              🔍
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Бесплатный Аудит
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7, flex: 1 }}>
              Придем, разберем твои процессы, укажем на узкие горлышки и честно скажем, нужен ли тебе ИИ. Никаких обязательств. Для всех.
            </p>
            <button className="btn-secondary" style={{ width: '100%', padding: '0.875rem' }}>
              Записаться на аудит
            </button>
          </motion.div>

          {/* Card 2 — Trial */}
          <motion.div
            className="card-warm"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderTop: '3px solid var(--accent-emerald)',
              position: 'relative',
              overflow: 'hidden'
            }}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={2}
          >
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
              <span style={{
                background: 'var(--accent-emerald)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}>
                Хит
              </span>
            </div>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(5, 150, 105, 0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem', fontSize: '1.75rem'
            }}>
              ⚡️
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Не уверен? Попробуй!
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7, flex: 1 }}>
              Возьми бота на неделю без оплаты. Просто посмотри на реальный результат в бою. Твои заявки будут обрабатываться 24/7.
            </p>
            <button className="btn-emerald" style={{ width: '100%', padding: '0.875rem', position: 'relative', overflow: 'hidden' }}>
              Взять бота для реальной проверки 🔥
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
