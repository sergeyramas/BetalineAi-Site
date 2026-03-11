import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SolutionSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center py-20 px-6 overflow-hidden">
      {/* Background with paradigm shift image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/80 to-bg-primary z-10"></div>
        <img 
          src="/images/paradigm-shift.png" 
          alt="Paradigm Shift" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          style={{ opacity, y }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Честное <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">решение.</span>
          </h2>
          
          <div className="space-y-6 text-xl text-text-secondary leading-relaxed">
            <p>
              Мы не просто "делаем ботов". <strong className="text-white">Боты — это игрушки.</strong> Мы строим для тебя <strong className="text-accent-teal">Систему</strong>. Мы даем Результат.
            </p>
            <p>
              То, что происходит сейчас с бизнесом — это переход от лошадей к автомобилям. Можно сколько угодно кормить лошадь отборным овсом и нанимать лучших кучеров, но автомобиль всё равно уедет дальше и быстрее.
            </p>
            <p>
              После внедрения этой системы ты физически почувствуешь перемены. Наступит другая эпоха: без человеческого фактора на рутине, без выгорания сотрудников, с мгновенной обработкой 100% лидов.
            </p>
            <p className="p-6 border-l-4 border-accent-purple bg-accent-purple/5 text-white italic">
              «И да, скажем честно: мы тоже хотим на этом заработать. Мы создаем системы, которые экономят тебе миллионы, а мы берем за это справедливую цену.»
            </p>
            <p className="font-medium text-white text-2xl pt-4">
              Но мы не просим тебя верить на слово.
            </p>
          </div>
        </motion.div>

        <div className="hidden lg:block">
          {/* Empty spacer for image focal point if needed, or animated graphics */}
        </div>

      </div>
    </section>
  );
};

export default SolutionSection;
