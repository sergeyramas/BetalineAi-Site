import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, ShoppingBag, CheckCircle2 } from 'lucide-react';

const stats = [
    { value: '45', label: 'Дней окупаемости' },
    { value: '23%', label: 'Рост выручки' },
    { value: '24/7', label: 'Поддержка клиентов' },
    { value: 'x2', label: 'Снижение издержек' }
];

const salonResults = [
    { icon: <TrendingUp size={18} />, label: 'Рост выручки', value: '+23%', color: '#22c55e' },
    { icon: <Users size={18} />, label: 'Возврат клиентов', value: '+41%', color: '#3b82f6' },
    { icon: <Clock size={18} />, label: 'Окупаемость', value: '45 дней', color: '#8b5cf6' },
    { icon: <ShoppingBag size={18} />, label: 'Онлайн-записей', value: '+68%', color: '#f59e0b' }
];

const Cases = () => {
    return (
        <section className="section" id="cases">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <h2 className="section-title">Результаты <span className="text-gradient">внедрения</span></h2>
                    <p className="section-subtitle">
                        Каждый месяц отложенного старта — это потерянные клиенты, которые ушли к конкурентам с умным ИИ.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="stats-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    style={{ marginBottom: '4rem' }}
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="stat-item"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring' } }
                            }}
                        >
                            <div className="stat-number">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* === BEAUTY SALON CASE === */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ marginBottom: '4rem' }}
                >
                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', minHeight: '400px' }}>
                            {/* Left: Image */}
                            <div style={{ position: 'relative', minHeight: '300px' }}>
                                <img
                                    src="/salon.png"
                                    alt="Салон красоты"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(135deg, rgba(5,5,16,0.6) 0%, rgba(5,5,16,0.2) 100%)'
                                }} />
                                {/* Badge */}
                                <div style={{
                                    position: 'absolute', top: '1.5rem', left: '1.5rem',
                                    background: 'rgba(34,197,94,0.9)', backdropFilter: 'blur(8px)',
                                    borderRadius: '100px', padding: '0.4rem 1rem',
                                    color: 'white', fontWeight: 700, fontSize: '0.8rem',
                                    display: 'flex', alignItems: 'center', gap: '0.4rem'
                                }}>
                                    <CheckCircle2 size={14} />
                                    Реальный кейс
                                </div>
                            </div>

                            {/* Right: Case */}
                            <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                                    Салон красоты
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.875rem', color: 'var(--text-primary)' }}>
                                    Рост выручки на 23%<br />за 45 дней
                                </h3>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>
                                            Проблема
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                            Хаотичные записи, «заморозка» денег в товарах, ручное управление акциями, отток клиентов и высокая нагрузка на администраторов.
                                        </p>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>
                                            Решение BetaLine
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                            Авто-запись клиентов в WhatsApp/Telegram 24/7, напоминания о визите, персональные акции и авто-прогноз спроса на 2 недели вперед.
                                        </p>
                                    </div>
                                </div>

                                {/* Result metrics */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                    {salonResults.map((r, i) => (
                                        <div key={i} style={{
                                            background: 'var(--bg-tertiary)',
                                            borderRadius: '12px', padding: '0.875rem 1rem',
                                            display: 'flex', flexDirection: 'column', gap: '0.25rem'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: r.color, fontSize: '0.8rem', fontWeight: 600 }}>
                                                {r.icon}
                                                {r.label}
                                            </div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{r.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                                    * Данные CRM клиента за период внедрения
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Card */}
                <motion.div
                    className="glass-card"
                    style={{ padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.05))', zIndex: 0 }}></div>
                    <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            Завтра ваш конкурент запустит ИИ.<br />Что будете делать вы?
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>
                            Не откладывайте цифровизацию бизнеса. Оставьте заявку прямо сейчас для бесплатного аудита.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <a href="#rec1887745683">
                                <button className="btn-primary">Рассчитать проект</button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Cases;
