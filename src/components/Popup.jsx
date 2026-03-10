import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, CheckCircle } from 'lucide-react';

const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setIsOpen(false), 2500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: -60, y: -60, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -60, y: -60, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                    style={{
                        position: 'fixed',
                        top: '2rem',
                        left: '2rem',
                        zIndex: 200,
                        maxWidth: '370px',
                        width: '100%',
                    }}
                >
                    <motion.div
                        animate={{ boxShadow: ['0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset', '0 24px 60px rgba(59,130,246,0.3), 0 0 0 2px rgba(59,130,246,0.3) inset', '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <div style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid rgba(59,130,246,0.3)',
                            borderRadius: '20px',
                            padding: '0',
                            overflow: 'hidden',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset'
                        }}>
                            {/* Top accent bar */}
                            <div style={{ height: '4px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />

                            <div style={{ padding: '1.5rem' }}>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-secondary)', cursor: 'pointer' }}
                                >
                                    <X size={18} />
                                </button>

                                {!sent ? (
                                    <>
                                        {/* Icon + Title */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                                            <div style={{
                                                width: '48px', height: '48px', borderRadius: '14px',
                                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <Zap size={24} color="white" />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                                                    🎁 Бесплатно
                                                </div>
                                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                                                    Бесплатный аудит вашего бизнеса
                                                </h3>
                                            </div>
                                        </div>

                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                            Покажем, где вы теряете клиентов и деньги. Рассчитаем, как бот окупится за 45 дней. <strong style={{ color: 'var(--text-primary)' }}>Вам это ничего не стоит.</strong>
                                        </p>

                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                            <input
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="Ваше имя"
                                                required
                                                style={{
                                                    background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                                                    borderRadius: '10px', padding: '0.75rem 1rem', color: 'var(--text-primary)',
                                                    fontSize: '0.875rem', outline: 'none', width: '100%'
                                                }}
                                            />
                                            <input
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                placeholder="Номер телефона"
                                                type="tel"
                                                required
                                                style={{
                                                    background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                                                    borderRadius: '10px', padding: '0.75rem 1rem', color: 'var(--text-primary)',
                                                    fontSize: '0.875rem', outline: 'none', width: '100%'
                                                }}
                                            />
                                            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem', borderRadius: '10px' }}>
                                                Получить бесплатный аудит
                                            </button>
                                        </form>
                                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
                                            Без спама. Отвечаем в течение 30 минут.
                                        </p>
                                    </>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ textAlign: 'center', padding: '1rem 0' }}
                                    >
                                        <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                                        <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Заявка принята!</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                            Перезвоним в течение 30 минут.
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup;
