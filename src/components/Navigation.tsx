import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Академия', href: '#method' },
  { label: 'Протоколы', href: '#protocols' },
  { label: 'Цены', href: '#pricing' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-deep-obsidian/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
        style={{
          borderRadius: scrolled ? '100px' : '100px',
          padding: '12px 24px',
          border: scrolled ? '1px solid rgba(0, 255, 255, 0.1)' : '1px solid transparent',
          maxWidth: '90vw',
          width: 'auto',
        }}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <img src="/logo.png" alt="SpectrMind" className="w-8 h-8" />
            <span className="font-heading font-bold text-lg tracking-tight text-txt-primary hidden sm:inline">
              SPECTR<span className="text-spectr-cyan">MIND</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-txt-secondary hover:text-spectr-cyan transition-colors duration-300 font-body relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-spectr-cyan transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo('#pricing')}
            className="hidden sm:block px-5 py-2 bg-spectr-cyan text-black text-sm font-heading font-semibold rounded transition-all duration-300 hover:bg-spectr-electric hover:shadow-glow"
          >
            Начать
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-txt-primary p-1"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-deep-space/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-heading text-txt-primary hover:text-spectr-cyan transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#pricing')}
              className="px-8 py-3 bg-spectr-cyan text-black text-lg font-heading font-semibold rounded"
            >
              Начать трансформацию
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
