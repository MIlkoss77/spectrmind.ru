import { motion } from 'framer-motion';
import { Check, Star, Shield, Zap, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

const tiers = [
  {
    id: 'neuro-hacker',
    name: 'Нейро-Хакер',
    nameEn: 'НЕЙРО-ХАКЕР',
    price: '1 990',
    oldPrice: '3 990',
    period: 'Разово',
    description: 'Идеальный старт',
    features: [
      'Протокол №1: Пептидный циклинг',
      'Протокол №2: Дофаминовый детокс',
      'Протокол №3: Матрица решений',
      'Протокол №4: Архитектура сна',
      'Протокол №5: НЛП и инженерия аффирмаций',
    ],
    cta: 'Купить базу',
    popular: false,
  },
  {
    id: 'spectr-club',
    name: 'SPECTR CLUB',
    nameEn: 'SPECTR CLUB',
    price: '990',
    oldPrice: '2 990',
    period: '/месяц',
    description: 'Ежедневная практика',
    features: [
      'Закрытый Telegram-канал',
      'Ежедневные микро-протоколы',
      'Еженедельные голосовые чаты',
      'Личная поддержка',
      'Комьюнити единомышленников',
    ],
    cta: 'Купить доступ в клуб',
    popular: false,
  },
  {
    id: 'base-club',
    name: 'База + 1 неделя клуба',
    nameEn: 'БАЗА + КЛУБ',
    price: '2 490',
    oldPrice: '3 990',
    period: '',
    description: 'Идеальный старт + пробный доступ',
    features: [
      'Всё из базы',
      '7 дней доступа в закрытый Telegram-клуб',
      'Бесплатная сессия с психологом',
    ],
    cta: 'Купить базу + клуб',
    popular: false,
  },
  {
    id: 'neuro-master',
    name: 'Нейро-Мастер',
    nameEn: 'НЕЙРО-МАСТЕР',
    price: '9 990',
    oldPrice: '19 980',
    period: '',
    description: 'Максимальный результат',
    features: [
      'Всё из тарифа «Нейро-Хакер»',
      '3 месяца доступа в SPECTR CLUB (вместо 1)',
      '2 персональные сессии с нейропсихологом (60 мин)',
      'Индивидуальный план нейро-оптимизации',
      'Разбор биомаркеров и supplement stack',
      'Приоритетная поддержка 24/7 (3 месяца)',
      'Ранний доступ ко всем новым продуктам',
    ],
    cta: 'Разблокировать Нейро-Мастера',
    popular: true,
  },
];

const trustBadges = [
  { icon: Lock, text: 'Безопасная оплата' },
  { icon: Zap, text: 'Мгновенный доступ' },
  { icon: Shield, text: '30-дневная гарантия' },
];

function Countdown() {
  const [time, setTime] = useState({
    days: 3,
    hours: 14,
    minutes: 27,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-2xl">⏡</span>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-spectr-cyan">
          СЛЕДУЮЩИЙ ПОТОК ЗАКРЫВАЕТСЯ ЧЕРЕЗ:
        </p>
      </div>
      <div className="flex justify-center items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          <span className="font-mono text-3xl font-bold text-spectr-cyan">
            {formatTime(time.days)}
          </span>
        </div>
        <span className="text-txt-muted">:</span>
        <div className="flex items-center gap-1">
          <span className="font-mono text-3xl font-bold text-spectr-cyan">
            {formatTime(time.hours)}
          </span>
        </div>
        <span className="text-txt-muted">:</span>
        <div className="flex items-center gap-1">
          <span className="font-mono text-3xl font-bold text-spectr-cyan">
            {formatTime(time.minutes)}
          </span>
        </div>
        <span className="text-txt-muted">:</span>
        <div className="flex items-center gap-1">
          <span className="font-mono text-3xl font-bold text-spectr-cyan">
            {formatTime(time.seconds)}
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-12 text-xs text-txt-muted font-mono">
        <span>дней</span>
        <span>часов</span>
        <span>мин</span>
        <span>сек</span>
      </div>
    </div>
  );
}

export default function Pricing() {
  const handlePayment = async (tierId: string) => {
    try {
      const res = await fetch('http://localhost:3001/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tierId })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Ошибка при создании платежа. Попробуйте позже.');
    }
  };

  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-deep-space overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(0, 255, 255, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-spectr-cyan mb-4">
            PRICING
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-txt-primary mb-4">
            Выбери свой <span className="text-gradient-cyan">нейро-путь</span>
          </h2>
          <p className="text-txt-secondary text-base max-w-xl mx-auto">
            Приобрети когнитивное преимущество. Отмена в любой момент.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Countdown />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`relative p-8 border transition-all duration-500 ${
                tier.popular
                  ? 'border-spectr-cyan/40 bg-gradient-to-b from-spectr-cyan/5 to-transparent shadow-glow'
                  : 'border-white/10 bg-deep-obsidian/50 hover:border-white/20'
              }`}
              style={{ borderRadius: '0px' }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-spectr-cyan text-black font-mono text-xs px-3 py-1 tracking-wider hover:bg-spectr-electric">
                    <Star size={12} className="mr-1" />
                    ПОПУЛЯРНЫЙ
                  </Badge>
                </div>
              )}

              {tier.popular && (
                <div
                  className="absolute -top-3 -right-3"
                  style={{
                    background: 'linear-gradient(135deg, #00FFFF, #A855F7)',
                    color: '#000',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '6px 14px',
                    letterSpacing: '0.05em',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)',
                    animation: 'neon-pulse 2s ease-in-out infinite',
                    zIndex: 10,
                  }}
                >
                  СКИДКА −50%
                </div>
              )}

              {tier.popular && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, #00FFFF, #A855F7, transparent)',
                  }}
                />
              )}

              <p className="font-mono text-xs tracking-wider text-txt-muted mb-1">
                {tier.nameEn}
              </p>
              <h3 className="font-heading font-bold text-2xl text-txt-primary mb-2">
                {tier.name}
              </h3>
              <p className="text-sm text-txt-secondary mb-6">{tier.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-lg text-txt-muted line-through">
                    {tier.oldPrice} ₽
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-txt-primary">
                    {tier.price} ₽
                  </span>
                  {tier.period && (
                    <span className="text-txt-muted text-sm">{tier.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`shrink-0 mt-0.5 ${
                        tier.popular ? 'text-spectr-cyan' : 'text-txt-muted'
                      }`}
                    />
                    <span className="text-sm text-txt-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(tier.id)}
                className={`block w-full py-3.5 font-heading font-semibold text-sm text-center rounded transition-all duration-300 cursor-pointer ${
                  tier.popular
                    ? 'bg-spectr-cyan text-black hover:bg-spectr-electric hover:shadow-glow-strong'
                    : 'border border-white/20 text-txt-primary hover:border-spectr-cyan hover:text-spectr-cyan'
                }`}
                style={{ borderRadius: '4px' }}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.text} className="flex items-center gap-2 text-txt-muted">
                <Icon size={16} className="text-spectr-cyan" />
                <span className="text-xs font-mono">{badge.text}</span>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-txt-muted"
        >
          <span className="text-xs">Принимаем:</span>
          <div className="flex items-center gap-3">
            {['Visa', 'Mastercard', 'МИР', 'СБП', 'ЮMoney'].map((method) => (
              <span
                key={method}
                className="px-2 py-1 text-xs font-mono border border-white/10 bg-deep-obsidian"
                style={{ borderRadius: '4px' }}
              >
                {method}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
