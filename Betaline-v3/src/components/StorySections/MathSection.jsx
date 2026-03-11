import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calculator, ChevronDown, TrendingDown, TrendingUp } from 'lucide-react';

const formatNumber = (num) => num.toLocaleString('ru-RU');

const MathSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Calculator State
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [employees, setEmployees] = useState(5);
  const [salaryWithTax, setSalaryWithTax] = useState(140000);

  // Derived values
  const monthlyOld = employees * salaryWithTax;
  const yearlyOld = monthlyOld * 12;

  const aiSetup = 250000;
  const aiMonthly = 50000;
  const aiFirstYear = aiSetup + (aiMonthly * 12);

  const yearlySaving = yearlyOld - aiFirstYear;
  const monthlySaving = monthlyOld - aiMonthly;
  const savingPercent = Math.round((yearlySaving / yearlyOld) * 100);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const inputStyle = {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    padding: '0.875rem 1rem',
    color: 'var(--text-primary)',
    fontSize: '1.1rem',
    fontWeight: 600,
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
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

        {/* Expandable Interactive Calculator */}
        <motion.div
          style={{ marginTop: '3rem', textAlign: 'center' }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <button
            onClick={() => setIsCalcOpen(!isCalcOpen)}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-warm))',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-lg)',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Calculator size={22} />
            Индивидуальный расчёт для вашего бизнеса
            <ChevronDown size={22} style={{ transform: isCalcOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </button>

          <AnimatePresence>
            {isCalcOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="card-warm" style={{
                  marginTop: '2rem',
                  padding: '3rem',
                  textAlign: 'left',
                  border: '1px solid var(--border-highlight)',
                  boxShadow: 'var(--shadow-xl)',
                  background: 'var(--bg-secondary)'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                    {/* Input 1 */}
                    <div>
                      <label style={labelStyle}>Количество сотрудников</label>
                      <input
                        type="number"
                        min="1"
                        value={employees}
                        onChange={e => setEmployees(Math.max(1, parseInt(e.target.value) || 1))}
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent-amber)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                    {/* Input 2 */}
                    <div>
                      <label style={labelStyle}>З/П 1 сотрудника (с налогами), ₽</label>
                      <input
                        type="number"
                        step="10000"
                        min="10000"
                        value={salaryWithTax}
                        onChange={e => setSalaryWithTax(Math.max(10000, parseInt(e.target.value) || 10000))}
                        style={inputStyle}
                        onFocus={(e) => e.target.style.borderColor = 'var(--accent-amber)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                      />
                    </div>
                    {/* Computed Result */}
                    <div style={{
                      background: 'rgba(217, 119, 6, 0.05)',
                      border: '1px solid rgba(217, 119, 6, 0.2)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                        Текущий ФОТ в месяц:
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#dc2626', fontFamily: 'monospace' }}>
                        {formatNumber(monthlyOld)} ₽
                      </div>
                    </div>
                  </div>

                  {/* Results Comparison */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    background: 'var(--bg-primary)',
                    padding: '2rem',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--border-color)'
                  }}>
                    {/* Left: Old approach yearly */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <TrendingDown size={20} color="#dc2626" />
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>Затраты за 1 год</span>
                      </div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#dc2626', fontFamily: 'monospace' }}>
                        {formatNumber(yearlyOld)} ₽
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Без учёта отпусков, больничных и рабочих ошибок.
                      </div>
                    </div>

                    {/* Right: AI approach yearly */}
                    <div style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <TrendingUp size={20} color="#059669" />
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>С системой ИИ (1 год)</span>
                      </div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', fontFamily: 'monospace' }}>
                        {formatNumber(aiFirstYear)} ₽
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        {formatNumber(aiSetup)} ₽ внедрение + {formatNumber(aiMonthly)} ₽ / мес ведение.
                      </div>
                    </div>
                  </div>

                  {/* Final Big Savings */}
                  <div style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2rem',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(5, 150, 105, 0.3)'
                  }}>
                    <div style={{ fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9, marginBottom: '0.5rem' }}>
                      Ваша чистая выгода за первый год
                    </div>
                    <div style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
                      {yearlySaving > 0 ? formatNumber(yearlySaving) : 0} ₽
                    </div>
                    {savingPercent > 0 && (
                      <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Сокращение расходов на {savingPercent}%
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MathSection;

