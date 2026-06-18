# SpectrMind — Техническая спецификация

## Стек
- React 19 + TypeScript + Vite (через webapp-building skill)
- Tailwind CSS 3.4 + shadcn/ui
- GSAP + ScrollTrigger (scroll-анимации)
- Framer Motion (hover, entrance анимации)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono
- Lucide React (иконки)

## Зависимости

```bash
npm install gsap framer-motion
```

Google Fonts подключены через `<link>` в index.html:
- Space Grotesk (400, 500, 600, 700)
- Inter (400, 500)
- JetBrains Mono (400)

## Структура проекта

```
src/
├── components/
│   ├── Navigation.tsx          # Фиксированная навигация с glassmorphism
│   ├── CookieBanner.tsx        # Баннер cookies (ФЗ-152)
│   ├── NeuralParticles.tsx     # Canvas: 80 нейронов + соединения
│   └── ui/                     # shadcn/ui компоненты (accordion, etc.)
├── sections/
│   ├── Hero.tsx                # Hero 100vh + glassmorphic overlay
│   ├── Problem.tsx             # 3 glassmorphism карточки (Bento Grid)
│   ├── Method.tsx              # 3-фазный timeline (GSAP ScrollTrigger)
│   ├── Protocols.tsx           # Bento Grid 2x3 карточек
│   ├── Pricing.tsx             # 2 tiers + trust badges
│   ├── Testimonials.tsx        # Карусель отзывов
│   ├── FAQ.tsx                 # Accordion
│   ├── FinalCTA.tsx            # Email capture
│   └── Footer.tsx              # Footer + legal
├── pages/
│   ├── Privacy.tsx             # Политика конфиденциальности
│   └── Terms.tsx               # Публичная оферта
├── App.tsx                     # Корневой компонент + маршруты
├── main.tsx                    # Точка входа
└── index.css                   # Глобальные стили + CSS-переменные
public/
├── logo.png                    # Логотип SpectrMind
├── og-image.jpg                # OpenGraph image
└── favicon.ico
```

## Компоненты — инвентарь

### UI (shadcn/ui)
| Компонент | Назначение | Кастомизация |
|-----------|-----------|--------------|
| accordion | FAQ секция | Cyan иконки +/-, glassmorphism |
| button | Все CTA | Cyan gradient, hover glow |
| input | Email capture | Dark theme, cyan focus ring |
| badge | "ПОПУЛЯРНЫЙ", теги | Cyan border |
| card | Карточки протоколов, проблем | Glassmorphism вариант |

### Кастомные компоненты
| Компонент | Технологии | Сложность |
|-----------|-----------|-----------|
| Navigation | Tailwind + Framer Motion | Medium |
| NeuralParticles | Canvas 2D API | High |
| CookieBanner | Framer Motion (AnimatePresence) | Low |
| Hero | Tailwind + glassmorphism CSS | Medium |
| Problem | Tailwind + Framer Motion (stagger) | Medium |
| Method | GSAP ScrollTrigger | High |
| Protocols | Tailwind Grid + Framer Motion | Medium |
| Pricing | Tailwind + glow effects | Medium |
| Testimonials | CSS animation (marquee) | Medium |
| FAQ | shadcn accordion + кастом | Low |
| FinalCTA | Tailwind + form | Low |
| Footer | Tailwind | Low |

## Анимации — план реализации

| Анимация | Библиотека | Подход | Сложность |
|----------|-----------|--------|-----------|
| Neural Particles (80 точек + соединения) | Canvas 2D | Кастомный компонент, requestAnimationFrame, mouse interaction | High |
| Glassmorphism overlay | Pure CSS | backdrop-filter + box-shadow inset | Low |
| Hero entrance | Framer Motion | fade-up + stagger на текст | Low |
| Scroll indicator pulse | CSS @keyframes | Бесконечная анимация opacity | Low |
| Problem cards fade-up | Framer Motion | whileInView + stagger 0.15s | Medium |
| Method horizontal timeline | GSAP ScrollTrigger | Pin + horizontal translate | High |
| Protocols grid hover glow | Tailwind + CSS | group-hover border glow | Low |
| Pricing card glow | CSS | box-shadow cyan на hover | Low |
| Testimonials marquee | CSS animation | translateY infinite loop | Low |
| FAQ accordion | shadcn + Framer Motion | AnimatePresence для контента | Low |
| Entrance animations (global) | Framer Motion | IntersectionObserver через whileInView | Low |
| Navigation scroll effect | Framer Motion | background blur появляется при скролле | Low |
| Cookie banner slide | Framer Motion | AnimatePresence slide-up | Low |
| Hover scale + glow | Tailwind | transition-all hover:scale-[1.02] | Low |

## Цветовая схема (Tailwind config)

```js
colors: {
  deep: {
    space: '#0A0A0F',
    obsidian: '#13131A',
    carbon: '#1C1C24',
  },
  spectr: {
    cyan: '#00FFFF',
    electric: '#00D4D4',
    violet: '#A855F7',
    magenta: '#FF00FF',
  },
  txt: {
    primary: '#FFFFFF',
    secondary: '#A0A0B0',
    muted: '#6B6B7B',
  }
}
```

## Типографика

```js
fontFamily: {
  heading: ['Space Grotesk', 'sans-serif'],
  body: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

## Ключевые решения

1. **Neural Particles**: Canvas 2D вместо WebGL для простоты. 80 точек, соединения при расстоянии < 150px, градиент cyan → violet. Реагирует на mouse move (отталкивание). На mobile: 40 точек для производительности.

2. **Method Section**: Используем GSAP ScrollTrigger с pin. При скролле фазы переключаются горизонтально. Каждая фаза: номер (JetBrains Mono, огромный), заголовок, описание.

3. **Glassmorphism**: `backdrop-filter: blur(24px) saturate(150%)` + inset box-shadow для inner specular highlight. НЕ использовать полупрозрачные PNG.

4. **Responsive**: Mobile-first. На < 640px: протоколы в 1 колонку, timeline вертикальный, particles уменьшены. Sticky CTA на mobile.

5. **Performance**: `will-change: transform` на анимированных элементах. `prefers-reduced-motion` — отключаем particles и scroll-triggered анимации.

## SEO + Meta

```html
<title>SpectrMind — Нейро-трансформация и когнитивная оптимизация</title>
<meta name="description" content="5 научных протоколов для апгрейда мозга...">
<meta property="og:title" content="SpectrMind — Апгрейдь свой мозг">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://spectrmind.ru">
<meta property="og:locale" content="ru_RU">
```

## Compliance (ФЗ-152)

- CookieBanner: согласие на cookies + ссылка на политику
- Footer disclaimer: образовательная платформа, не мед. консультация
- Страницы: /privacy, /terms
- Чекбокс согласия на обработку ПДн в email-форме
