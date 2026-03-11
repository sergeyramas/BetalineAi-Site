import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RealitySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center py-20 px-6 bg-[#0a0510] border-t border-white/5">
      {/* Dramatic red ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        <motion.div style={{ opacity }} className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Ты думаешь, ИИ — это <span className="text-red-500">игрушка</span> для гиков?
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed mb-8">
            Нет. Это увольнение целых отделов. Твои конкуренты уже внедряют это. А ты?
          </p>
          
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm">
            <h3 className="text-red-400 font-medium mb-2 uppercase tracking-wider text-sm">Суровая правда 2024</h3>
            <p className="text-white/90">
              По данным Goldman Sachs & McKinsey, автоматизация коренным образом меняет правила игры, оставляя позади тех, кто цепляется за старые методы.
            </p>
          </div>
        </motion.div>

        <div className="relative h-full min-h-[500px] w-full flex flex-col justify-center gap-6">
          <motion.div 
            style={{ y: y1 }}
            className="w-full lg:w-[90%] self-end glass-card p-8 rounded-[2rem] border-white/10 hover:border-red-500/30 transition-colors"
          >
            <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 mb-4">
              70%
            </div>
            <p className="text-lg text-text-secondary">
              рабочего времени сотрудников будет автоматизировано ИИ к 2030 году.
            </p>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            className="w-full lg:w-[90%] self-start glass-card p-8 rounded-[2rem] border-white/10 hover:border-red-500/30 transition-colors ml-0 lg:-ml-10"
          >
            <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 mb-4">
              36%
            </div>
            <p className="text-lg text-text-secondary">
              финансовых компаний уже сейчас снизили расходы на 10% и более.
            </p>
          </motion.div>

          <motion.div 
            style={{ y: y1 }}
            className="w-full lg:w-[90%] self-end glass-card p-8 rounded-[2rem] border-white/10 hover:border-red-500/30 transition-colors"
          >
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              Кейс Klarna
            </div>
            <p className="text-lg text-text-secondary">
              ИИ-ассистент выполняет работу <span className="text-white font-bold">700 агентов</span> поддержки, сократив расходы на 11%.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default RealitySection;
