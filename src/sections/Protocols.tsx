import { motion } from 'framer-motion';

const protocols = [
  {
    id: '01',
    title: 'Пептидный циклинг',
    description:
      'Точные визуальные циклы для Semax, Cerebrolysin, BPC-157, Selank и P21 для безопасной стимуляции BDNF, NGF и нейропластичности без даунрегуляции рецепторов.',
    span: 'col-span-1 md:col-span-2',
    highlight: false,
  },
  {
    id: '02',
    title: 'Дофаминовый детокс 2.0',
    description:
      'Строгая 7-дневная последовательность (Крах → Ясность → Поток → Реинтеграция) для восстановления чувствительности D1/D2 рецепторов.',
    span: 'col-span-1',
    highlight: true,
  },
  {
    id: '03',
    title: 'Матрица решений',
    description:
      'Обойди кортизоловый захват миндалевидного тела. 6-шаговый когнитивный фреймворк (правило 10/10/10) для хладнокровных высокорисковых решений.',
    span: 'col-span-1',
    highlight: false,
  },
  {
    id: '04',
    title: 'Архитектура сна',
    description:
      'Оптимизируй глубокий и REM-сон. Мастерство температуры, шума и света через стек Магния Глицината, L-Теанина и Апигенина.',
    span: 'col-span-1',
    highlight: false,
  },
  {
    id: '05',
    title: 'НЛП и инженерия аффирмаций',
    description:
      'Перепиши подсознательное программирование через геббовское обучение («нейроны, которые загораются вместе, связываются вместе») и мостовые аффирмации.',
    span: 'col-span-1 md:col-span-2',
    highlight: false,
  },
  {
    id: 'BONUS',
    title: 'PWA Neurotracker',
    description:
      'Эксклюзивный пожизненный доступ к цифровому PWA-приложению для отслеживания всех 5 протоколов и формирования нейро-привычек.',
    span: 'col-span-1 md:col-span-3',
    highlight: true,
    isBonus: true,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Protocols() {
  return (
    <section
      id="protocols"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-deep-space"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-spectr-cyan mb-4">
            WHAT YOU GET
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-txt-primary">
            6 протоколов{' '}
            <span className="text-gradient-violet">когнитивной трансформации</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {protocols.map((protocol, i) => (
            <motion.div
              key={protocol.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className={`${protocol.span} group relative p-6 sm:p-8 border transition-all duration-500 overflow-hidden ${
                protocol.highlight
                  ? protocol.isBonus
                    ? 'bg-gradient-to-r from-spectr-cyan/10 to-spectr-violet/10 border-spectr-cyan/30 hover:border-spectr-cyan/60'
                    : 'bg-spectr-cyan/5 border-spectr-cyan/20 hover:border-spectr-cyan/40 hover:shadow-glow'
                  : 'bg-deep-obsidian/50 border-white/5 hover:border-white/15'
              }`}
              style={{ borderRadius: '0px' }}
            >
              {/* Number */}
              <span
                className={`font-mono text-sm tracking-wider mb-4 block ${
                  protocol.isBonus ? 'text-spectr-violet' : 'text-spectr-cyan'
                }`}
              >
                {protocol.id}
              </span>

              {/* Title */}
              <h3 className="font-heading font-semibold text-xl text-txt-primary mb-3">
                {protocol.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-txt-secondary leading-relaxed">
                {protocol.description}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(0, 255, 255, 0.06) 0%, transparent 70%)',
                }}
              />

              {/* Bonus indicator */}
              {protocol.isBonus && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-spectr-cyan/20 border border-spectr-cyan/40">
                  <span className="font-mono text-xs text-spectr-cyan">BONUS</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
