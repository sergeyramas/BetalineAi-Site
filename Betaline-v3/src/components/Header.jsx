import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
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
        { name: 'О нас', href: '#about' },
        { name: 'Экономия', href: '#math' },
        { name: 'Решение', href: '#solution' },
        { name: 'Начать', href: '#offer' }
    ];

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container nav-container">
                    <a href="#" className="logo-link">
                        <img src="/logo_b.png" alt="Betaline AI" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                        <span>Betaline AI</span>
                    </a>

                    <nav className="nav-links">
                        {navLinks.map((item) => (
                            <a
                                href={item.href}
                                key={item.name}
                                className="nav-item"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <div className="nav-links" style={{ alignItems: 'center', gap: '1rem' }}>
                        <a href="tel:88002001259" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                            <Phone size={16} />
                            8 800 200-12-59
                        </a>
                        <a href="#offer">
                            <button 
                                className="btn-primary" 
                                style={{ padding: '0.625rem 1.5rem' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.dispatchEvent(new CustomEvent('openAuditPopup'));
                                }}
                            >
                                Получить аудит
                            </button>
                        </a>
                    </div>

                    <div className="mobile-menu-btn">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        style={{
                            position: 'fixed', top: '70px', left: 0, right: 0, bottom: 0,
                            background: 'var(--bg-primary)', padding: '2rem', zIndex: 40
                        }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', fontSize: '1.25rem' }}>
                            {navLinks.map((item) => (
                                <a href={item.href} key={item.name} onClick={() => setMobileMenuOpen(false)}
                                   style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                                    {item.name}
                                </a>
                            ))}
                            <a href="tel:88002001259" style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={20} />
                                8 800 200-12-59
                            </a>
                            <a href="#offer" style={{ width: '100%', maxWidth: '300px' }}>
                                <button 
                                    className="btn-primary" 
                                    style={{ width: '100%', padding: '0.875rem' }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        window.dispatchEvent(new CustomEvent('openAuditPopup'));
                                    }}
                                >
                                    Получить аудит
                                </button>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
