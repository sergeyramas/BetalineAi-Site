import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';

const Header = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Ниши', href: '#Sfera' },
        { name: 'Запуск в 3 шага', href: '#rec1879166463' },
        { name: 'Кейсы', href: '#cases' }
    ];

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container nav-container">
                    <motion.a
                        href="#"
                        className="logo-link"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                    >
                        <img src="/logo_b.png" alt="Betaline AI" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Betaline AI</span>
                    </motion.a>

                    <nav className="nav-links">
                        {navLinks.map((item, idx) => (
                            <motion.a
                                href={item.href}
                                key={item.name}
                                className="nav-item"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </nav>

                    <motion.div
                        className="nav-links"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ alignItems: 'center', gap: '1.5rem' }}
                    >
                        <a href="tel:88002001259" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                            <Phone size={16} />
                            8 800 200-12-59
                        </a>

                        <button
                            onClick={toggleTheme}
                            className="nav-item"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <a href="http://localhost:3737" target="_blank" rel="noopener noreferrer">
                            <button className="btn-secondary" style={{ padding: '0.625rem 1.25rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>Личный кабинет</button>
                        </a>
                        <a href="http://localhost:3737" target="_blank" rel="noopener noreferrer">
                            <button className="btn-primary" style={{ padding: '0.625rem 1.25rem' }}>Создать бота</button>
                        </a>
                    </motion.div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-menu-btn">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="glass"
                        style={{ position: 'fixed', top: '70px', left: '0', right: '0', bottom: '0', background: 'var(--bg-primary)', padding: '2rem', zIndex: 40 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', fontSize: '1.25rem' }}>
                            {navLinks.map((item) => (
                                <a href={item.href} key={item.name} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                                    {item.name}
                                </a>
                            ))}
                            <a href="tel:88002001259" style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={20} />
                                8 800 200-12-59
                            </a>
                            <a href="http://localhost:3737" target="_blank" rel="noopener noreferrer" style={{ width: '100%', maxWidth: '300px' }}>
                                <button className="btn-secondary" style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '0.5rem' }}>Личный кабинет</button>
                            </a>
                            <a href="http://localhost:3737" target="_blank" rel="noopener noreferrer" style={{ width: '100%', maxWidth: '300px' }}>
                                <button className="btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Создать бота</button>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
