import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' }
  })
};

const stats = [
  { value: '70%', text: 'рабочего времени сотрудников будет автоматизировано ИИ к 2030 году.', color: '#dc2626' },
  { value: '36%', text: 'финансовых компаний уже снизили расходы на 10% и более.', color: '#ea580c' },
  { value: '700', text: 'агентов поддержки заменил ИИ-ассистент Klarna, сократив расходы на 11%.', color: '#d97706', label: 'Кейс Klarna' },
];

const RealitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="reality-section">
      <div className="reality-grid">

        {/* Left — Text + Image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="reality-text"
        >
          <h2 className="reality-title">
            Ты думаешь, ИИ — это{' '}
            <span style={{ color: '#dc2626' }}>игрушка</span> для гиков?
          </h2>
          <p className="reality-subtitle">
            Нет. Это увольнение целых отделов. Твои конкуренты уже внедряют это. А ты?
          </p>

          <div className="reality-warning-card">
            <h3 className="reality-warning-title">Суровая правда 2024</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              По данным Goldman Sachs & McKinsey, автоматизация коренным образом меняет правила игры, оставляя позади тех, кто цепляется за старые методы.
            </p>
          </div>

          <img
            src="/images/reality.png"
            alt="Старый офис vs AI"
            className="section-image"
          />
        </motion.div>

        {/* Right — Stat Cards */}
        <div className="reality-stats">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              className="card-warm stat-card-item"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i + 1}
            >
              {stat.label && (
                <div className="stat-label-tag" style={{ color: stat.color }}>
                  {stat.label}
                </div>
              )}
              <div className="stat-big-number" style={{
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {stat.value}{stat.value === '700' ? ' агентов' : ''}
              </div>
              <p className="stat-text">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealitySection;
