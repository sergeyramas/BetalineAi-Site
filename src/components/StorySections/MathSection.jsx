import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MathSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center py-20 px-6">
      <div className="absolute inset-0 bg-bg-secondary z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none"></div>
      </div>

      <motion.div 
        style={{ scale, opacity }}
        className="max-w-4xl w-full mx-auto relative z-10 glass-card p-8 md:p-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Считаем твои деньги</h2>
          <p className="text-xl text-text-secondary">(буквально)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-text-primary border-b border-white/10 pb-4">Старый подход</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-text-secondary">
                <span>Отдел (5 человек)</span>
                <span className="font-mono text-white">5 × 100 000 ₽</span>
              </div>
              <div className="flex justify-between items-center text-text-secondary">
                <span>Налоги и сборы</span>
                <span className="font-mono text-white">~40%</span>
              </div>
              <div className="pt-4 border-t border-red-500/20 flex justify-between items-center">
                <span className="text-lg font-medium text-white">Итого в месяц:</span>
                <span className="text-2xl font-bold font-mono text-red-400">700 000 ₽</span>
              </div>
              <div className="text-right text-sm text-text-muted">
                (≈ 8.4 млн ₽ в год)
              </div>
            </div>
          </div>

          <div className="space-y-6 relative">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-bg-secondary rounded-full border border-white/10 flex items-center justify-center text-xl font-bold text-white z-20 hidden md:flex">
              VS
            </div>

            <h3 className="text-2xl font-semibold text-accent-blue border-b border-accent-blue/20 pb-4">Система ИИ</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-text-secondary">
                <span>Внедрение (разово)</span>
                <span className="font-mono text-white">250 000 ₽</span>
              </div>
              <div className="flex justify-between items-center text-text-secondary">
                <span>Поддержка/API</span>
                <span className="font-mono text-white">50 000 ₽ / мес</span>
              </div>
              <div className="pt-4 border-t border-accent-blue/30 flex justify-between items-center">
                <span className="text-lg font-medium text-white">Первый год:</span>
                <span className="text-2xl font-bold font-mono text-accent-teal">850 000 ₽</span>
              </div>
              <div className="text-right text-sm text-text-muted">
                (Вместо 8.4 млн ₽)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <div className="text-sm tracking-widest uppercase text-accent-purple mb-2">Чистая экономия</div>
          <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-teal">
            &gt; 7 500 000 ₽
          </div>
          <p className="mt-4 text-text-secondary">за один год. Каждый следующий год — экономия еще больше.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default MathSection;
