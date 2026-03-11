import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  return (
    <section id="solution" ref={ref} className="solution-section">
      <div className="solution-grid">

        {/* Image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="solution-image-wrap"
        >
          <img
            src="/images/solution.png"
            alt="Переход от лошадей к автомобилям"
            className="section-image"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="solution-text"
        >
          <h2 className="solution-title">
            Честное{' '}
            <span className="text-gradient-warm">решение.</span>
          </h2>

          <div className="solution-body">
            <p>
              Мы не просто "делаем ботов". <strong style={{ color: 'var(--text-primary)' }}>Боты — это игрушки.</strong>{' '}
              Мы строим для тебя <strong style={{ color: 'var(--accent-emerald)' }}>Систему</strong>. Мы даем Результат.
            </p>
            <p>
              То, что происходит сейчас с бизнесом — это переход от лошадей к автомобилям. Можно сколько угодно кормить лошадь отборным овсом, но автомобиль всё равно уедет дальше и быстрее.
            </p>
            <p>
              После внедрения этой системы ты физически почувствуешь перемены. Наступит другая эпоха: без человеческого фактора на рутине, без выгорания сотрудников, с мгновенной обработкой 100% лидов.
            </p>

            <div className="solution-blockquote">
              «И да, скажем честно: мы тоже хотим на этом заработать. Мы создаем системы, которые экономят тебе миллионы, а мы берем за это справедливую цену.»
            </div>

            <p className="solution-cta-text">
              Но мы не просим тебя верить на слово.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
