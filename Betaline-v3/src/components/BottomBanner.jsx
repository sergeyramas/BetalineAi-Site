import { motion } from 'framer-motion';

const BottomBanner = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '2rem',
                zIndex: 100,
            }}
        >
            <motion.a
                href="https://t.me/betaline_ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-emerald"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    padding: '0.875rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.9rem'
                }}
            >
                💬 Перейти в группу
            </motion.a>
        </motion.div>
    );
};

export default BottomBanner;
