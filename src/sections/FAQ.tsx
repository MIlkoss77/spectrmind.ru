import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Что такое нейро-оптимизация?',
    answer:
      'Научно-обоснованный подход к улучшению когнитивных функций через биохакинг, нейронауку и поведенческую психологию. Основан на работах Бехтеревой, Губермана и современных исследованиях нейропластичности.',
  },
  {
    question: 'Нужны ли предварительные знания?',
    answer:
      'Нет. Протоколы структурированы от базового к продвинутому. Начни с Дофаминового детокса — он не требует добавок или специальных навыков.',
  },
  {
    question: 'Когда я увижу результаты?',
    answer:
      'Первые изменения — через 3-7 дней (дофаминовый ресет). Глубокие нейронные перестройки занимают 21-66 дней (по исследованиям London University о формировании привычек).',
  },
  {
    question: 'Это медицинская консультация?',
    answer:
      'НЕТ. SpectrMind — образовательная платформа. Материалы предоставлены исключительно в информационных целях. Перед применением любых добавок или протоколов проконсультируйтесь с квалифицированным врачом.',
  },
  {
    question: 'Могу ли я отменить подписку?',
    answer:
      'Да, вы можете отменить подписку. Плюс 30-дневная когнитивная гарантия — если не почувствуешь значительного улучшения фокуса и ясности, мы вернём 100% оплаты.',
  },
  {
    question: 'Что такое Decision Lab?',
    answer:
      'Когнитивный тренажёр для тренировки навыков принятия решений. Включает симуляции, фреймворки и ежедневные упражнения для развития хладнокровного мышления под давлением.',
  },
];

export default function FAQ() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-deep-space">
      <div className="relative max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-spectr-cyan mb-4">
            FAQ
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-txt-primary">
            Часто задаваемые <span className="text-gradient-cyan">вопросы</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-white/10 bg-deep-obsidian/30 px-6 data-[state=open]:border-spectr-cyan/30 transition-colors duration-300"
                style={{ borderRadius: '0px' }}
              >
                <AccordionTrigger className="py-5 text-left font-heading font-semibold text-base text-txt-primary hover:text-spectr-cyan transition-colors [&[data-state=open]]:text-spectr-cyan">
                  <span className="font-mono text-spectr-cyan mr-4 text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm text-txt-secondary leading-relaxed pl-10">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
