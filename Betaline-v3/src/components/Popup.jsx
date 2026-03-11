import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    const inputStyle = {
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem 1rem',
        color: 'var(--text-primary)',
        fontSize: '0.9rem',
        outline: 'none',
        width: '100%',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s ease'
    };

    const panelWidth = 370;

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
        }}>
            {/* Sliding panel + tab wrapper */}
            <motion.div
                animate={{ x: isOpen ? 0 : -panelWidth }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    pointerEvents: 'auto',
                }}
            >
                {/* Panel */}
                <div style={{
                    width: `${panelWidth}px`,
                    flexShrink: 0,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-highlight)',
                    borderRadius: '0 var(--radius-2xl) var(--radius-2xl) 0',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-xl)',
                }}>
                    {/* Top accent bar */}
                    <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-warm))' }} />

                    <div style={{ padding: '1.5rem' }}>
                        {!sent ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '14px',
                                        background: 'linear-gradient(135deg, var(--accent-amber), var(--accent-warm))',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Zap size={24} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                                            🎁 Бесплатно
                                        </div>
                                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                                            Бесплатный аудит вашего бизнеса
                                        </h3>
                                    </div>
                                </div>

                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                                    Покажем, где вы теряете клиентов и деньги. Рассчитаем, как бот окупится за 45 дней.{' '}
                                    <strong style={{ color: 'var(--text-primary)' }}>Вам это ничего не стоит.</strong>
                                </p>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" required style={inputStyle} />
                                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Номер телефона" type="tel" required style={inputStyle} />
                                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.25rem', borderRadius: 'var(--radius-md)' }}>
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
                                <CheckCircle size={48} color="#059669" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Заявка принята!</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    Перезвоним в течение 30 минут.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Tab handle */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        flexShrink: 0,
                        width: '44px',
                        height: '120px',
                        background: 'linear-gradient(180deg, var(--accent-amber), var(--accent-warm))',
                        border: 'none',
                        borderRadius: '0 14px 14px 0',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                        boxShadow: '4px 2px 12px rgba(217, 119, 6, 0.25)',
                        color: 'white',
                        padding: '0.5rem 0',
                    }}
                >
                    {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                    <span style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-sans)',
                    }}>
                        Аудит
                    </span>
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Popup;
