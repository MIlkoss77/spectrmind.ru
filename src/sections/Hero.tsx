import { motion } from 'framer-motion';
import NeuralParticles from '../components/NeuralParticles';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToMethod = () => {
    const el = document.querySelector('#problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-deep-space">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.7 }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Neural Particles Overlay */}
      <NeuralParticles />

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(10,10,15,0.7) 70%, rgba(10,10,15,0.95) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-[100dvh] px-4">
        {/* Glassmorphic Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel glass-border relative p-8 sm:p-12 md:p-16 max-w-[640px] w-full mx-auto"
          style={{ borderRadius: '0px' }}
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-spectr-cyan mb-6"
          >
            SPECTRMIND PROTOCOL // 01
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight text-txt-primary mb-4"
          >
            Апгрейдь свой мозг.
            <br />
            <span className="text-gradient-cyan">Управляй реальностью.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base text-txt-secondary leading-relaxed mb-8"
          >
            Экосистема нейро-оптимизации для пиковой когнитивной производительности.
            Основано на работах Бехтеревой и современной нейронауке.
          </motion.p>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-deep-space"
                  style={{
                    background: `linear-gradient(135deg, hsl(${180 + i * 20}, 70%, 60%), hsl(${200 + i * 30}, 60%, 50%))`,
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-txt-muted font-mono">
              Доверяют 10 000+ когнитивных пионеров
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => {
                const el = document.querySelector('#pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 bg-spectr-cyan text-black font-heading font-semibold text-sm rounded transition-all duration-300 hover:bg-spectr-electric hover:shadow-glow-strong"
            >
              Начать трансформацию
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#method');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 border border-spectr-cyan/40 text-spectr-cyan font-heading font-semibold text-sm rounded transition-all duration-300 hover:border-spectr-cyan hover:bg-spectr-cyan/10"
            >
              Изучить Академию
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToMethod}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-txt-muted hover:text-spectr-cyan transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
