import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show after a short delay
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[100]"
        >
          <div className="glass-panel border border-white/10 p-5 relative">
            <button
              onClick={accept}
              className="absolute top-3 right-3 text-txt-muted hover:text-txt-primary transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <p className="text-sm text-txt-secondary mb-4 pr-6">
              Мы используем cookies для улучшения работы сайта. Продолжая
              использовать сайт, вы соглашаетесь с{' '}
              <a
                href="/privacy"
                className="text-spectr-cyan hover:underline"
              >
                политикой обработки персональных данных
              </a>
              .
            </p>

            <div className="flex gap-3">
              <button
                onClick={accept}
                className="px-4 py-2 bg-spectr-cyan text-black text-sm font-heading font-semibold rounded transition-all hover:bg-spectr-electric"
                style={{ borderRadius: '4px' }}
              >
                Принять
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 border border-white/20 text-txt-secondary text-sm rounded transition-all hover:border-white/40"
                style={{ borderRadius: '4px' }}
              >
                Отклонить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
