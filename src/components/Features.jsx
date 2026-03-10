import { motion } from 'framer-motion';
import { Activity, Shield, Zap, Globe, Cpu, LineChart } from 'lucide-react';

const features = [
    {
        icon: <Cpu size={24} />,
        title: 'Онлайн-запись и продажи 24/7',
        desc: 'Ваши клиенты могут записаться на услугу или купить товар в любое время суток, даже когда менеджеры спят.'
    },
    {
        icon: <Zap size={24} />,
        title: 'Снижение нагрузки на менеджеров',
        desc: 'Разгрузите отдел продаж от рутинных однотипных ответов на вопросы "Где мы находимся?" или "Сколько стоит?".'
    },
    {
        icon: <Shield size={24} />,
        title: 'Мгновенная реакция',
        desc: 'Клиент получает ответ за 1 секунду. Он не успеет уйти к конкуренту из-за долгого ожидания.'
    },
    {
        icon: <Globe size={24} />,
        title: 'Интеграция с вашей CRM',
        desc: 'Бот автоматически заносит все данные о клиенте прямо в вашу корпоративную базу, обогащая профили.'
    },
    {
        icon: <Activity size={24} />,
        title: 'Аналитика и AI-скоринг',
        desc: 'Нейросети оценивают температуру клиента и передают горячие лиды первыми на закрытие.'
    },
    {
        icon: <LineChart size={24} />,
        title: 'Рост выручки',
        desc: 'По нашим кейсам внедрение ИИ снижает издержки и увеличивает конверсию из заявки в продажу на треть.'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Features = () => {
    return (
        <section className="section" id="Sfera">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="section-title">Чат-боты на языке вашего <span className="text-gradient">бизнеса</span></h2>
                    <p className="section-subtitle">
                        Мы делаем внедрение ИИ простым и быстрым. От малого бизнеса до крупных IT-корпораций.
                    </p>
                </motion.div>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {features.map((feat, idx) => (
                        <motion.div key={idx} variants={itemVariants} className="glass-card feature-card">
                            <div className="feature-icon-wrapper">
                                {feat.icon}
                            </div>
                            <h3 className="feature-title">{feat.title}</h3>
                            <p className="feature-desc">{feat.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* 3 Step Section */}
            <div id="rec1879166463" style={{ marginTop: '8rem', borderTop: '1px solid var(--border-color)', paddingTop: '6rem' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 className="section-title">Как это работает — <span className="text-gradient">3 простых шага</span></h2>
                    </motion.div>
                    <div className="features-grid">
                        <div className="glass-card feature-card" style={{ textAlign: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '1rem' }}>1</div>
                            <h3 className="feature-title">Диагностика</h3>
                            <p className="feature-desc">Аудит процессов и создание карты автоматизации для вашей ниши.</p>
                        </div>
                        <div className="glass-card feature-card" style={{ textAlign: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-purple)', marginBottom: '1rem' }}>2</div>
                            <h3 className="feature-title">Пилотный запуск</h3>
                            <p className="feature-desc">Внедряем базового бота за пару недель и тестируем его на первых клиентах.</p>
                        </div>
                        <div className="glass-card feature-card" style={{ textAlign: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-teal)', marginBottom: '1rem' }}>3</div>
                            <h3 className="feature-title">Масштабирование</h3>
                            <p className="feature-desc">Добавляем сложную логику, интеграции и AI-скоринг для 100% эффективности.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
