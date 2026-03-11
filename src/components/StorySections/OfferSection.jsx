import React from 'react';
import { motion } from 'framer-motion';

const OfferSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center py-20 px-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-secondary/90 z-10 backdrop-blur-sm"></div>
        <img 
          src="/images/ai-system.png" 
          alt="AI System" 
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-20">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Предложение, от которого нельзя отказаться
          </motion.h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Выбирай свой путь к автоматизации. Без агрессивных продаж. Только цифры и факты.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass-card p-10 flex flex-col items-start border-t-[3px] border-t-accent-purple"
          >
            <div className="w-16 h-16 rounded-full bg-accent-purple/10 flex items-center justify-center mb-6">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Бесплатный Аудит</h3>
            <p className="text-lg text-text-secondary mb-8 flex-grow">
              Придем, разберем твои процессы, укажем на узкие горлышки и честно скажем, нужен ли тебе ИИ. Никаких обязательств. Для всех.
            </p>
            <button className="btn-secondary w-full text-lg py-4">
              Записаться на аудит
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="relative glass-card p-10 flex flex-col items-start border-t-[3px] border-t-accent-blue overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
               <span className="bg-accent-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                 Хит
               </span>
            </div>
            <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center mb-6">
              <span className="text-3xl">⚡️</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Не уверен? Попробуй!</h3>
            <p className="text-lg text-text-secondary mb-8 flex-grow">
              Возьми бота на неделю без оплаты. Просто посмотри на реальный результат в бою. Твои заявки будут обрабатываться 24/7.
            </p>
            <button className="btn-primary w-full text-lg py-4 relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Взять бота для реальной проверки <span className="animate-pulse">🔥</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OfferSection;
