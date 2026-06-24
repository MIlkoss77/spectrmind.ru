import { motion } from 'framer-motion';

const footerLinks = {
  navigation: [
    { label: 'Академия', href: '#method' },
    { label: 'Протоколы', href: '#protocols' },
    { label: 'Цены', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],
  legal: [
    { label: 'Политика конфиденциальности', href: '/privacy' },
    { label: 'Публичная оферта', href: '/terms' },
    { label: 'Согласие на обработку ПДн', href: '/privacy' },
  ],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/spectrmind.ru/' },
    { label: 'VK', href: 'https://vk.com/spectrmind' },
  ],
};

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-deep-space border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="SpectrMind" className="w-10 h-10" />
              <span className="font-heading font-bold text-xl tracking-tight text-txt-primary">
                SPECTR<span className="text-spectr-cyan">MIND</span>
              </span>
            </div>
            <p className="text-sm text-txt-muted leading-relaxed">
              Экосистема нейро-оптимизации для пиковой когнитивной
              производительности.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs tracking-wider uppercase text-txt-muted mb-4">
              Навигация
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-txt-secondary hover:text-spectr-cyan transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-xs tracking-wider uppercase text-txt-muted mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-txt-secondary hover:text-spectr-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs tracking-wider uppercase text-txt-muted mb-4">
              Соцсети
            </h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-txt-secondary hover:text-spectr-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/5 pt-8"
        >
          <p className="text-xs text-txt-muted leading-relaxed mb-4 max-w-3xl">
            <strong className="text-txt-secondary">Disclaimer:</strong>{' '}
            SpectrMind — образовательная платформа. Контент предоставляется
            исключительно в информационных целях и не является медицинской
            консультацией или финансовой рекомендацией. Перед применением любых
            протоколов проконсультируйтесь с квалифицированным специалистом.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-txt-muted">
                © 2026 SpectrMind. Все права защищены.
              </p>
              <p className="font-mono text-xs text-txt-muted mt-1">
                Дороненко Владислав Сергеевич | ИНН 463245967103
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
