import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Мой фокус превратился из рассеянного в лазерный за три недели. Один только протокол дофаминового ресета стоил инвестиций в себя.',
    name: 'Алексей К.',
    age: '32 года',
    location: 'Москва',
    role: 'Предприниматель',
    gradient: 'from-spectr-cyan to-spectr-electric',
  },
  {
    quote:
      'Пептидный стек изменил мою продуктивность. Теперь я работаю 4 часа вместо 12 с тем же результатом.',
    name: 'Мария С.',
    age: '28 лет',
    location: 'Санкт-Петербург',
    role: 'IT-директор',
    gradient: 'from-spectr-violet to-spectr-magenta',
  },
  {
    quote:
      'Матрица решений полностью изменила мой подход к высокорисковым ситуациям. Хладнокровие, которого у меня никогда не было.',
    name: 'Дмитрий В.',
    age: '35 лет',
    location: 'Екатеринбург',
    role: 'Руководитель',
    gradient: 'from-spectr-electric to-spectr-cyan',
  },
  {
    quote:
      'Архитектура сна — это то, что мне было нужно годами. Наконец-то я просыпаюсь отдохнувшим и полным энергии.',
    name: 'Анна М.',
    age: '29 лет',
    location: 'Казань',
    role: 'Дизайнер',
    gradient: 'from-spectr-violet to-spectr-cyan',
  },
];

// Duplicate for seamless marquee
const allTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 bg-deep-space overflow-hidden">
      {/* Section Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-spectr-cyan mb-4">
            TESTIMONIALS
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-txt-primary">
            Реальные умы.{' '}
            <span className="text-gradient-cyan">Реальные результаты.</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-deep-space to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-deep-space to-transparent z-10 pointer-events-none" />

        {/* Scrolling content */}
        <motion.div
          className="flex flex-col gap-4"
          animate={{ y: ['0%', '-50%'] }}
          transition={{
            y: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {allTestimonials.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="mx-auto max-w-xl w-full px-4"
            >
              <div className="glass-panel border border-white/10 p-6 relative group hover:border-spectr-cyan/30 transition-all duration-500">
                {/* Quote Icon */}
                <Quote
                  size={24}
                  className="text-spectr-cyan/30 mb-4"
                />

                {/* Quote Text */}
                <p className="text-txt-primary text-sm leading-relaxed mb-6">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center`}
                  >
                    <span className="font-heading font-bold text-black text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <p className="font-heading font-semibold text-sm text-txt-primary">
                      {t.name}
                    </p>
                    <p className="font-mono text-xs text-txt-muted">
                      {t.age}, {t.location} — {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
