import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send } from 'lucide-react';

// Small preview images to show in chat as bot attachments
const BOT_IMAGES = [
    { src: '/salon.png', caption: '📌 Кейс: салон красоты +23% выручки за 45 дней' },
    { src: '/businessman_bg.png', caption: '📌 Пример: автоматизация bизнеса под ключ' },
];

const FALLBACK = [
    { text: 'Наши боты снижают нагрузку на менеджеров до 60% и работают 24/7. Вот пример реального кейса 👇', img: BOT_IMAGES[0] },
    { text: 'Стоимость базовой интеграции от 30 000 ₽. Окупаемость — в среднем 45 дней по нашим кейсам.' },
    { text: 'Интегрируемся с Telegram, WhatsApp, ВКонтакте и вашим сайтом. Один бот — все каналы.' },
    { text: 'По кейсам рост выручки в среднем +23% за первый квартал после внедрения.', img: BOT_IMAGES[1] },
    { text: 'Хотите узнать, как это работает именно для вашего бизнеса? Оставьте номер телефона — перезвоним за 30 минут.' },
];
let fi = 0;

function HeroChat() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: 'Привет! 👋 Я ИИ-ассистент Betaline AI.\nЧем могу помочь вашему бизнесу?' },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const endRef = useRef(null);


    useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

    const send = () => {
        const text = input.trim();
        if (!text || typing) return;
        setInput('');
        setMessages(p => [...p, { id: Date.now(), role: 'user', content: text }]);
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            const reply = FALLBACK[fi % FALLBACK.length]; fi++;
            setMessages(p => [...p, { id: Date.now() + 1, role: 'assistant', content: reply.text, ...(reply.img ? { img: reply.img } : {}) }]);
        }, 1400);
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', height: '480px',
            background: 'rgba(8,14,30,0.85)', backdropFilter: 'blur(24px)',
            borderRadius: '20px', border: '1px solid rgba(59,130,246,0.25)',
            overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset'
        }}>
            {/* Header */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '0.875rem', background: 'rgba(59,130,246,0.07)' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    <Bot size={20} />
                </div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'white' }}>Betaline Assistant</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}>
                        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
                        ИИ-ассистент · всегда онлайн
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div style={{ flexGrow: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}>
                {messages.map(msg => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                        style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '82%', display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: '0.5rem', alignItems: 'flex-end' }}
                    >
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, background: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: '100%' }}>
                            <div style={{
                                background: msg.role === 'user' ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'rgba(255,255,255,0.06)',
                                color: 'white', padding: '0.7rem 0.875rem',
                                borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                                fontSize: '0.875rem', lineHeight: 1.55,
                                border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                whiteSpace: 'pre-wrap',
                                boxShadow: msg.role === 'user' ? '0 4px 14px rgba(59,130,246,0.3)' : 'none'
                            }}>{msg.content}</div>
                            {msg.img && (
                                <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <img src={msg.img.src} alt={msg.img.caption} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
                                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.4rem 0.6rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>{msg.img.caption}</div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {typing && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Bot size={13} /></div>
                        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.75rem 1rem', borderRadius: '14px 14px 14px 4px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                            {[0, 0.2, 0.4].map((d, i) => <motion.div key={i} animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 0.8, delay: d }} style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%' }} />)}
                        </div>
                    </motion.div>
                )}
                <div ref={endRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)' }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
                    placeholder="Напишите вопрос боту..." disabled={typing}
                    style={{ flexGrow: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '0.75rem 1rem', color: 'white', fontSize: '0.875rem', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button onClick={send} disabled={!input.trim() || typing}
                    style={{ width: '44px', height: '44px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: (!input.trim() || typing) ? 'rgba(255,255,255,0.07)' : 'linear-gradient(135deg,#3b82f6,#2563eb)', color: (!input.trim() || typing) ? 'rgba(255,255,255,0.3)' : 'white', border: 'none', borderRadius: '10px', cursor: (!input.trim() || typing) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: (!input.trim() || typing) ? 'none' : '0 4px 14px rgba(59,130,246,0.4)' }}>
                    <Send size={17} />
                </button>
            </div>
        </div>
    );
}

const Hero = () => {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <motion.div
                        className="badge"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Sparkles size={16} />
                        <span>Betaline AI v2.0 уже доступна</span>
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Интеллект, который масштабирует ваш <span className="text-gradient">бизнес</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Умные чат-боты для автоматизации рутины, контроля лидов в CRM и кратного роста выручки. Делегируйте коммуникации нейросетям.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <a href="#rec1887745683">
                            <button className="btn-primary">
                                Рассчитать стоимость <ChevronRight size={18} style={{ marginLeft: '0.25rem' }} />
                            </button>
                        </a>
                        <a href="#demo">
                            <button className="btn-secondary">
                                Смотреть демо
                            </button>
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    className="hero-image-wrapper"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <HeroChat />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
