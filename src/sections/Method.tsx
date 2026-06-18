import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    id: '01',
    title: 'Нейрофундамент',
    subtitle: 'NEURO-FUNDAMENTAL',
    description:
      'Сбрось дофаминовые рецепторы через научно обоснованный биохакинг, пептидные протоколы и нутритивную оптимизацию. Восстанови биологическую основу пиковой когниции.',
    details: ['Пептидный циклинг', 'Нутритивная оптимизация', 'BDNF стимуляция'],
    color: '#00FFFF',
  },
  {
    id: '02',
    title: 'Программирование реальности',
    subtitle: 'REALITY PROGRAMMING',
    description:
      'Перестрой нейронные пути через НЛП, точные аффирмации и управление кортизолом. Входи в состояние потока по запросу.',
    details: ['НЛП-протоколы', 'Управление кортизолом', 'Состояние потока'],
    color: '#A855F7',
  },
  {
    id: '03',
    title: 'Интеграция ясности',
    subtitle: 'CLARITY INTEGRATION',
    description:
      'Установи фреймворки принятия решений и системы информационной гигиены. Устрани когнитивный шум.',
    details: ['Матрица решений', 'Информационная гигиена', 'Когнитивный фокус'],
    color: '#00D4D4',
  },
];

export default function Method() {
  const [activePhase, setActivePhase] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // ScrollTrigger-based phase activation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) setActivePhase(0);
          else if (progress < 0.66) setActivePhase(1);
          else setActivePhase(2);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="method"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-deep-space overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 255, 255, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-spectr-cyan mb-4">
            THE SPECTRMIND METHOD
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-txt-primary">
            3-фазный <span className="text-gradient-cyan">нейроресет</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="w-full h-full bg-white/10" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-spectr-cyan to-spectr-violet"
              animate={{
                height: `${((activePhase + 1) / phases.length) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Phases */}
          <div className="space-y-16 md:space-y-24">
            {phases.map((phase, i) => {
              const isActive = activePhase === i;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActivePhase(i)}
                >
                  {/* Content Card */}
                  <div
                    className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      className={`p-8 border transition-all duration-500 ${
                        isActive
                          ? 'border-spectr-cyan/30 bg-white/[0.03] shadow-glow'
                          : 'border-white/5 bg-deep-obsidian/50'
                      }`}
                      style={{ borderRadius: '0px' }}
                    >
                      <p className="font-mono text-xs tracking-wider text-txt-muted mb-2">
                        {phase.subtitle}
                      </p>
                      <h3 className="font-heading font-semibold text-2xl text-txt-primary mb-4">
                        {phase.title}
                      </h3>
                      <p className="text-sm text-txt-secondary leading-relaxed mb-6">
                        {phase.description}
                      </p>

                      {/* Detail Tags */}
                      <div
                        className={`flex flex-wrap gap-2 ${
                          isLeft ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        {phase.details.map((detail) => (
                          <span
                            key={detail}
                            className="px-3 py-1 text-xs font-mono border border-white/10 text-txt-secondary"
                            style={{ borderRadius: '4px' }}
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      animate={{
                        boxShadow: isActive
                          ? `0 0 30px ${phase.color}40, 0 0 60px ${phase.color}20`
                          : '0 0 0px transparent',
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 flex items-center justify-center border-2 transition-all duration-500 ${
                        isActive
                          ? 'border-spectr-cyan bg-deep-space'
                          : 'border-white/20 bg-deep-obsidian'
                      }`}
                      style={{ borderRadius: '50%' }}
                    >
                      <span
                        className={`font-mono text-lg font-bold transition-colors duration-300 ${
                          isActive ? 'text-spectr-cyan' : 'text-txt-muted'
                        }`}
                      >
                        {phase.id}
                      </span>
                    </motion.div>
                  </div>

                  {/* Phase Number (mobile) */}
                  <div className="md:hidden flex items-center justify-center">
                    <div
                      className={`w-12 h-12 flex items-center justify-center border-2 ${
                        isActive ? 'border-spectr-cyan' : 'border-white/20'
                      }`}
                      style={{ borderRadius: '50%' }}
                    >
                      <span className="font-mono text-sm font-bold text-spectr-cyan">
                        {phase.id}
                      </span>
                    </div>
                  </div>

                  {/* Spacer for layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
