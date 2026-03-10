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
                animate={{
                    opacity: [1, 0.6, 1],
                    boxShadow: [
                        '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
                        '0 4px 20px 0 rgba(59, 130, 246, 0.6)',
                        '0 4px 14px 0 rgba(59, 130, 246, 0.39)'
                    ]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="btn-primary"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    padding: '0.875rem 1.5rem',
                    borderRadius: 'var(--radius-full)',
                }}
            >
                Перейти в группу
            </motion.a>
        </motion.div>
    );
};

export default BottomBanner;
