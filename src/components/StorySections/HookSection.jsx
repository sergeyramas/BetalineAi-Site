import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HookSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Immersive background with spotlight */}
      <div className="absolute inset-0 bg-bg-primary z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white opacity-[0.03] rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-medium tracking-wider mb-6">
          ДЛЯ ВЛАДЕЛЬЦЕВ БИЗНЕСА
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
          <span className="text-white">Давай начистоту.</span><br />
          <span className="text-gradient">Как обстоят дела сейчас?</span>
        </h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Мир меняется быстрее, чем ты успеваешь обновлять регламенты. Пока мы говорим, нейросети уже забирают рутину. И да, РФ, как обычно, немного позади... 
          <span className="block mt-4 text-white font-medium">но те, кто перешел на ИИ — уже в космосе.</span>
        </motion.p>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-text-muted cursor-pointer"
        style={{ opacity, y }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-sm tracking-widest uppercase mb-2">Листай дальше</span>
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default HookSection;
