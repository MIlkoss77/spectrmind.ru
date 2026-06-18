import { motion } from 'framer-motion';
import { Flame, Brain, Zap } from 'lucide-react';

const problems = [
  {
    icon: Flame,
    title: 'Дофаминовая перегрузка',
    description:
      'Бесконечные уведомления и мгновенные удовольствия перестраивают твой мозг на отвлечение, убивая глубокий фокус.',
    variant: 'glass' as const,
  },
  {
    icon: Brain,
    title: 'Усталость от решений',
    description:
      'Твой мозг обрабатывает 35 000 решений ежедневно. Каждое истощает ментальную энергию, необходимую для важного.',
    variant: 'solid' as const,
  },
  {
    icon: Zap,
    title: 'Кортизоловый захват',
    description:
      'Хронический стресс затапливает систему кортизолом, блокируя префронтальную кору, ответственную за ясное мышление.',
    variant: 'accent' as const,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-deep-space">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-txt-primary mb-4">
            Твоя префронтальная кора{' '}
            <span className="relative inline-block">
              перегружена
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-spectr-cyan to-spectr-violet" />
            </span>
          </h2>
          <p className="text-txt-secondary text-base max-w-2xl">
            Современный мир атакует твою нервную систему 24/7. Вот три механизма,
            которые разрушают твою когнитивную производительность.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            const isGlass = problem.variant === 'glass';
            const isSolid = problem.variant === 'solid';
            const isAccent = problem.variant === 'accent';

            return (
              <motion.div
                key={problem.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className={`relative p-8 transition-all duration-500 group ${
                  isGlass
                    ? 'bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-spectr-cyan/40 hover:shadow-glow'
                    : isSolid
                    ? 'bg-deep-obsidian border border-white/5 hover:border-spectr-cyan/30'
                    : 'bg-gradient-to-br from-spectr-cyan to-spectr-electric'
                }`}
                style={{ borderRadius: '0px' }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center mb-6 ${
                    isAccent ? 'bg-black/20' : 'bg-spectr-cyan/10'
                  }`}
                  style={{ borderRadius: '4px' }}
                >
                  <Icon
                    size={24}
                    className={isAccent ? 'text-black' : 'text-spectr-cyan'}
                  />
                </div>

                {/* Title */}
                <h3
                  className={`font-heading font-semibold text-xl mb-3 ${
                    isAccent ? 'text-black' : 'text-txt-primary'
                  }`}
                >
                  {problem.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed ${
                    isAccent ? 'text-black/80' : 'text-txt-secondary'
                  }`}
                >
                  {problem.description}
                </p>

                {/* Hover Glow Effect */}
                {isGlass && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.08) 0%, transparent 70%)',
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
