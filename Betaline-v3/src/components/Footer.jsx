const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="#" className="logo-link" style={{ fontSize: '1.35rem', fontWeight: 700 }}>
                            <img src="/logo_b.png" alt="Betaline AI" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                            <span>Betaline AI</span>
                        </a>
                        <p>
                            Новое поколение специализированых ИИ-моделей. Мы создаем инфраструктуру, чтобы вы управляли будущим.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-col-title">Продукт</h4>
                        <div className="footer-links">
                            <a href="#about" className="footer-link">О нас</a>
                            <a href="#math" className="footer-link">Экономия</a>
                            <a href="#solution" className="footer-link">Решение</a>
                            <a href="#offer" className="footer-link">Начать</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-col-title">Контакты</h4>
                        <div className="footer-links">
                            <a href="tel:88002001259" className="footer-link">8 800 200-12-59</a>
                            <a href="#offer" className="footer-link">Оставить заявку</a>
                            <a href="#" className="footer-link">Договор-оферта</a>
                            <a href="#" className="footer-link">Политика конфиденциальности</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-col-title">Компания</h4>
                        <div className="footer-links">
                            <a href="#" className="footer-link">О нас</a>
                            <a href="#" className="footer-link">Блог</a>
                            <a href="https://t.me/betaline_ai" target="_blank" rel="noopener noreferrer" className="footer-link">Telegram</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div>&copy; {new Date().getFullYear()} Betaline AI. Все права защищены.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="https://t.me/betaline_ai" target="_blank" rel="noopener noreferrer" className="footer-link">Telegram</a>
                        <a href="#" className="footer-link">VK</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
