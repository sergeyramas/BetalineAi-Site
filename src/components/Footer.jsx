import { BrainCircuit } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="#" className="logo-link" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                            <BrainCircuit className="logo-icon" size={28} />
                            <span>Betaline AI</span>
                        </a>
                        <p>
                            Новое поколение специализированых ИИ-моделей. Мы создаем инфраструктуру, чтобы вы управляли будущим.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-col-title">Продукт</h4>
                        <div className="footer-links">
                            <a href="#Sfera" className="footer-link">Ниши</a>
                            <a href="#rec1879166463" className="footer-link">Запуск в 3 шага</a>
                            <a href="#cases" className="footer-link">Кейсы</a>
                            <a href="#demo" className="footer-link">Демо</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-col-title">Контакты</h4>
                        <div className="footer-links">
                            <a href="tel:88002001259" className="footer-link">8 800 200-12-59</a>
                            <a href="#rec1887745683" className="footer-link">Оставить заявку</a>
                            <a href="#" className="footer-link">Договор-оферта</a>
                            <a href="#" className="footer-link">Политика конфиденциальности</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-col-title">Компания</h4>
                        <div className="footer-links">
                            <a href="#" className="footer-link">О нас</a>
                            <a href="#" className="footer-link">Блог</a>
                            <a href="#" className="footer-link">Telegram</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div>&copy; {new Date().getFullYear()} Betaline AI. Все права защищены.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="#" className="footer-link">Telegram</a>
                        <a href="#" className="footer-link">VK</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
