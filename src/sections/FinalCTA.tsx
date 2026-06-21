import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Zap, Mail, Download, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcqezF1Z1utDSv3ihFNa3SO-Qcx-5SoNRojdPQZKvlBYo-_URtYlgebsgiNcfGzpYUZg/exec';

const trustItems = [
  { icon: Lock, text: 'SSL-шифрование' },
  { icon: Shield, text: '30-дневная гарантия' },
  { icon: Zap, text: 'Мгновенная доставка' },
];

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      setSubmitted(true);
    } catch {
      setError('Произошла ошибка. Попробуй ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-deep-space overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0, 255, 255, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-spectr-cyan mb-4">
            JOIN THE PROTOCOL
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-txt-primary mb-4 leading-tight">
            Твой мозг заслуживает{' '}
            <span className="text-gradient-cyan">апгрейда</span>
          </h2>
          <p className="text-txt-secondary text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Присоединяйся к 10 000+ когнитивным пионерам, уже трансформирующим
            свою реальность.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted"
                />
                <Input
                  type="email"
                  placeholder="Введи email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 bg-deep-obsidian border-white/10 text-txt-primary placeholder:text-txt-muted focus:border-spectr-cyan focus:ring-spectr-cyan/20"
                  style={{ borderRadius: '4px' }}
                />
              </div>
              <button
                type="submit"
                disabled={!agreed || loading}
                className="h-12 px-6 bg-spectr-cyan text-black font-heading font-semibold text-sm rounded transition-all duration-300 hover:bg-spectr-electric hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center gap-2"
                style={{ borderRadius: '4px' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Получить бесплатный гайд'
                )}
              </button>
            </div>

            {/* Consent Checkbox */}
            <label className="flex items-start gap-2 max-w-md mx-auto cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 accent-spectr-cyan"
              />
              <span className="text-xs text-txt-muted text-left">
                Я согласен с{' '}
                <a href="/privacy" className="text-spectr-cyan hover:underline">
                  политикой конфиденциальности
                </a>{' '}
                и даю согласие на обработку персональных данных в соответствии с
                ФЗ-152
              </span>
            </label>

            {error && (
              <p className="text-sm text-red-400 max-w-md mx-auto text-left">
                {error}
              </p>
            )}
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-8"
          >
            <div className="inline-flex flex-col items-center gap-4 px-6 py-4 border border-spectr-cyan/30 bg-spectr-cyan/5">
              <div className="flex items-center gap-3">
                <Zap size={24} className="text-spectr-cyan" />
                <div className="text-left">
                  <p className="font-heading font-semibold text-txt-primary">
                    Гайд готов к скачиванию!
                  </p>
                  <p className="text-sm text-txt-secondary">
                    Нажми кнопку ниже, чтобы скачать PDF.
                  </p>
                </div>
              </div>
              <a
                href="/free_neuro_guideru.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-spectr-cyan text-black font-heading font-semibold text-sm rounded transition-all duration-300 hover:bg-spectr-electric hover:shadow-glow"
                style={{ borderRadius: '4px' }}
              >
                <Download size={16} />
                Скачать бесплатный гайд
              </a>
            </div>
          </motion.div>
        )}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                className="flex items-center gap-2 text-txt-muted"
              >
                <Icon size={16} className="text-spectr-cyan" />
                <span className="text-xs font-mono">{item.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
