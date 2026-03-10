import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, MessageCircle, X, Minimize2 } from 'lucide-react';

const OPENAI_KEY = ''; // Optionally set API key here

const SYSTEM_PROMPT = `Ты — ИИ-ассистент Betaline AI. 
Ты помогаешь предпринимателям внедрить умных чат-ботов в их бизнес.
Ты вежливый, конкретный, дружелюбный. 
Ты говоришь ТОЛЬКО по-русски. 
Давай короткие чёткие ответы (2-4 предложения). 
Если тема не связана с бизнесом или ботами — мягко верни разговор к теме.
Ты НЕ GPT, ты — ассистент Betaline AI.`;

const FALLBACK_RESPONSES = [
    "Отличный вопрос! Наши чат-боты интегрируются с любой CRM за 2-3 недели и снижают нагрузку на менеджеров до 60%.",
    "Стоимость внедрения начинается от 30 000 ₽. Всё зависит от сложности сценариев и каналов коммуникаций.",
    "По нашим кейсам, окупаемость наступает уже через 45 дней. Рост выручки в среднем 23% за первый квартал.",
    "Да, мы работаем с Telegram, WhatsApp, ВКонтакте, Instagram и вашим сайтом. Один бот — все каналы.",
    "Для старта нам нужны: описание бизнеса, частые вопросы клиентов, доступ к CRM. Запускаем за 14 дней.",
    "Оставьте заявку — мы бесплатно проведём аудит ваших процессов и покажем, где бот принесёт максимум."
];

let fallbackIndex = 0;

async function fetchBotReply(history) {
    if (!OPENAI_KEY) {
        const resp = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
        fallbackIndex++;
        return resp;
    }
    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_KEY}` },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
                max_tokens: 200
            })
        });
        const data = await res.json();
        return data.choices?.[0]?.message?.content || FALLBACK_RESPONSES[0];
    } catch {
        const resp = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
        fallbackIndex++;
        return resp;
    }
}

const initialMessage = {
    id: 1,
    role: 'assistant',
    content: 'Здравствуйте! Я ИИ-ассистент Betaline AI 🤖\n\nКак я могу помочь автоматизировать ваш бизнес сегодня?'
};

const INVITE_MESSAGE = 'Хотите узнать, как чат-бот увеличит вашу прибыль? Напишите мне! 👇';

export default function ChatDemo() {
    const [messages, setMessages] = useState([initialMessage]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    const [hasShownInvite, setHasShownInvite] = useState(false);

    const sectionRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Intersection observer — expand when section in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsSectionVisible(true);
                    setIsExpanded(true);
                    // Show invite message once when scrolling into view
                    if (!hasShownInvite) {
                        setHasShownInvite(true);
                        setTimeout(() => {
                            setIsTyping(true);
                            setTimeout(() => {
                                setIsTyping(false);
                                setMessages(prev => {
                                    if (prev.length <= 1) {
                                        return [...prev, { id: Date.now(), role: 'assistant', content: INVITE_MESSAGE }];
                                    }
                                    return prev;
                                });
                            }, 1800);
                        }, 600);
                    }
                } else {
                    setIsSectionVisible(false);
                    setIsExpanded(false);
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [hasShownInvite]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || isTyping) return;
        setInput('');

        const userMsg = { id: Date.now(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);

        setIsTyping(true);
        const historyForAPI = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

        const reply = await fetchBotReply(historyForAPI);
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', content: reply }]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Mini floating bubble (shown when scrolled past the section)
    const FloatingBubble = () => (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
                position: 'fixed',
                bottom: '6rem',
                right: '2rem',
                zIndex: 1000,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.75rem'
            }}
        >
            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    background: 'rgba(15,23,42,0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    borderRadius: '12px',
                    padding: '0.625rem 1rem',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }}
            >
                Задайте вопрос боту ↑
            </motion.div>

            {/* Pulsing bubble */}
            <div style={{ position: 'relative' }}>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        inset: '-6px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        opacity: 0.4
                    }}
                />
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(59,130,246,0.5)',
                    position: 'relative'
                }}>
                    <MessageCircle size={28} />
                    {/* Notification dot */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#22c55e',
                            border: '2px solid #050510'
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );

    return (
        <>
            {/* Floating bubble when scrolled past section */}
            <AnimatePresence>
                {!isSectionVisible && <FloatingBubble />}
            </AnimatePresence>

            {/* Main Demo Section */}
            <section
                ref={sectionRef}
                id="demo"
                style={{
                    position: 'relative',
                    background: 'url(/businessman_bg.png) center/cover no-repeat',
                    borderTop: '1px solid var(--border-color)',
                    borderBottom: '1px solid var(--border-color)',
                    minHeight: '800px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6rem 0'
                }}
            >
                {/* Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, rgba(5,5,16,0.95) 0%, rgba(5,5,16,0.7) 100%)',
                    zIndex: 0
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '4rem',
                        alignItems: 'center'
                    }}>
                        {/* Left block */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="section-title" style={{ color: 'white', textAlign: 'left' }}>
                                Поговорите с ботом <span className="text-gradient">прямо сейчас</span>
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', marginTop: '1.5rem', lineHeight: 1.7, maxWidth: '420px' }}>
                                Наш ИИ-ассистент на базе GPT ответит на любой вопрос о внедрении автоматизации в ваш бизнес. Не скрипты — настоящий интеллект.
                            </p>
                            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { icon: <Bot size={18} />, text: 'Умный ответ за 1 секунду', color: '#3b82f6' },
                                    { icon: <MessageCircle size={18} />, text: 'Настоящий ИИ, не скрипты', color: '#8b5cf6' },
                                    { icon: <User size={18} />, text: 'Понимает контекст разговора', color: '#14b8a6' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white' }}>
                                        <div style={{
                                            width: '38px', height: '38px', borderRadius: '10px',
                                            background: `${item.color}22`,
                                            border: `1px solid ${item.color}44`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: item.color
                                        }}>
                                            {item.icon}
                                        </div>
                                        <span style={{ fontSize: '1rem' }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Chat Window */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="glass-card" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '560px',
                                overflow: 'hidden',
                                background: 'rgba(8, 14, 30, 0.8)',
                                backdropFilter: 'blur(28px)',
                                border: '1px solid rgba(59,130,246,0.2)',
                                boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset'
                            }}>

                                {/* Header */}
                                <div style={{
                                    padding: '1rem 1.25rem',
                                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                                    background: 'rgba(59,130,246,0.06)'
                                }}>
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                                        flexShrink: 0
                                    }}>
                                        <Bot size={22} />
                                    </div>
                                    <div style={{ flexGrow: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>Betaline Assistant</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '2px' }}>
                                            <motion.div
                                                animate={{ opacity: [1, 0.3, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }}
                                            />
                                            ИИ-ассистент · всегда онлайн
                                        </div>
                                    </div>
                                    <Minimize2 size={16} style={{ color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }} />
                                </div>

                                {/* Messages */}
                                <div style={{
                                    flexGrow: 1,
                                    padding: '1.25rem',
                                    overflowY: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.875rem',
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: 'rgba(255,255,255,0.1) transparent'
                                }}>
                                    <AnimatePresence>
                                        {messages.map(msg => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{
                                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                                    maxWidth: '85%',
                                                    display: 'flex',
                                                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                                                    gap: '0.625rem',
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                <div style={{
                                                    width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                                                    background: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px'
                                                }}>
                                                    {msg.role === 'user' ? <User size={15} /> : <Bot size={15} />}
                                                </div>
                                                <div style={{
                                                    background: msg.role === 'user'
                                                        ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                                                        : 'rgba(255,255,255,0.06)',
                                                    color: 'white',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                                    fontSize: '0.9375rem',
                                                    lineHeight: 1.6,
                                                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                                    whiteSpace: 'pre-wrap',
                                                    boxShadow: msg.role === 'user' ? '0 4px 16px rgba(59,130,246,0.3)' : 'none'
                                                }}>
                                                    {msg.content}
                                                </div>
                                            </motion.div>
                                        ))}

                                        {isTyping && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.625rem', alignItems: 'flex-end' }}
                                            >
                                                <div style={{
                                                    width: '30px', height: '30px', borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                                                }}>
                                                    <Bot size={15} />
                                                </div>
                                                <div style={{
                                                    background: 'rgba(255,255,255,0.06)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    padding: '0.875rem 1.125rem',
                                                    borderRadius: '16px 16px 16px 4px',
                                                    display: 'flex', gap: '5px', alignItems: 'center'
                                                }}>
                                                    {[0, 0.2, 0.4].map((d, i) => (
                                                        <motion.div key={i}
                                                            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                                                            transition={{ repeat: Infinity, duration: 0.8, delay: d }}
                                                            style={{ width: '7px', height: '7px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%' }}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </AnimatePresence>
                                </div>

                                {/* Input */}
                                <div style={{
                                    padding: '1rem',
                                    borderTop: '1px solid rgba(255,255,255,0.07)',
                                    display: 'flex',
                                    gap: '0.625rem',
                                    background: 'rgba(0,0,0,0.2)'
                                }}>
                                    <input
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Напишите вопрос боту..."
                                        disabled={isTyping}
                                        style={{
                                            flexGrow: 1,
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            padding: '0.875rem 1.125rem',
                                            color: 'white',
                                            fontSize: '0.9375rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!input.trim() || isTyping}
                                        style={{
                                            width: '48px', height: '48px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: (!input.trim() || isTyping) ? 'rgba(255,255,255,0.07)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                            color: (!input.trim() || isTyping) ? 'rgba(255,255,255,0.3)' : 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: (!input.trim() || isTyping) ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                            flexShrink: 0,
                                            boxShadow: (!input.trim() || isTyping) ? 'none' : '0 4px 14px rgba(59,130,246,0.4)'
                                        }}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
