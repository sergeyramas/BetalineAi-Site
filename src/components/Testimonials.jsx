import { motion } from 'framer-motion';

const stats = [
    { value: '4B+', label: 'API Requests / Day' },
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '50ms', label: 'Global Latency' },
    { value: '10k+', label: 'Enterprise Clients' }
];

const Testimonials = () => {
    return (
        <section className="section" id="resources">
            <div className="container">
                <motion.div
                    className="stats-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="stat-item"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring' } }
                            }}
                        >
                            <div className="stat-number">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to action card */}
                <motion.div
                    className="glass-card"
                    style={{ padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.05))', zIndex: 0 }}></div>

                    <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Ready to transform your workflow?</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>
                            Join thousands of forward-thinking teams already building the future with Betaline AI.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button className="btn-primary">Start your free trial</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
