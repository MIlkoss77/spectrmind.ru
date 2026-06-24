import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type Format = 'reels' | 'carousel' | 'shorts';
type ScriptType = 'problem-solution' | 'myths-reality' | 'before-after' | 'list' | 'storytime';

interface ScriptTemplate {
  name: string;
  structure: string[];
  example: string[];
}

const templates: Record<ScriptType, ScriptTemplate> = {
  'problem-solution': {
    name: 'Проблема → Решение',
    structure: [
      'HOOK (0-1.5с): Провокационный вопрос / шокирующий факт',
      'PROBLEM (1.5-5с): Опиши боль аудитории',
      'AGITATE (5-10с): Усили проблему — последствия',
      'SOLUTION (10-25с): Протокол/совет из нейрогайда',
      'CTA (25-30с): "Ссылка в шапке" / "Читай карусель"',
    ],
    example: [
      'Знаешь, почему ты не можешь сосредоточиться дольше 20 минут?',
      'Твой дофаминовый контур выгорел из-за бесконечного скроллинга.',
      'Каждый день ты теряешь 3 часа продуктивности и не замечаешь этого.',
      'Протокол дофаминового детокса из нейрогайда восстанавливает фокус за 7 дней. Без таблеток.',
      'Ссылка в шапке — забери бесплатный протокол.',
    ],
  },
  'myths-reality': {
    name: 'Мифы vs Реальность',
    structure: [
      'HOOK: "Тебя обманывают关于 [тема]"',
      'MYTH 1: Распространённое заблуждение',
      'REALITY 1: Что говорит наука',
      'MYTH 2: Ещё одно заблуждение',
      'REALITY 2: Реальность',
      'CTA: "Правда в нейрогайде — ссылка в шапке"',
    ],
    example: [
      'Тебя обманывают关于 кофеин и продуктивность.',
      'Миф: Кофеин даёт энергию. Реальность: он просто блокирует аденозин. Энергия — иллюзия.',
      'Миф: Нужно 8 часов сна каждую ночь. Реальность: оптимум индивидуален — от 6 до 9.',
      'Миф: Медитация — это про расслабление. Реальность — это тренировка контроля внимания.',
      'Разбираю все мифы в нейрогайде. Ссылка в шапке.',
    ],
  },
  'before-after': {
    name: 'До / После',
    structure: [
      'HOOK: "Вот что случилось через 30 дней"',
      'BEFORE: Опиши старое состояние (утро, энергия, фокус)',
      'BRIDGE: Что изменил (протокол из гайда)',
      'AFTER: Новое состояние',
      'CTA: "Хочешь так же? Ссылка в шапке"',
    ],
    example: [
      'Вот что случилось с моей продуктивностью за 30 дней.',
      'Было: встаю в 10, зомби до обеда, засыпаю в 2 часа ночи.',
      'Добавил 2 протокола из нейрогайда: архитектура сна + утренний свет.',
      'Стало: встаю в 6:30 бодрым, фокус до обеда, засыпаю за 15 минут.',
      'Хочешь так же? Нейрогайд — ссылка в шапке.',
    ],
  },
  'list': {
    name: 'Список (3-5 советов)',
    structure: [
      'HOOK: "[N] вещей, которые убивают твою концентрацию"',
      'ITEM 1: Совет + объяснение',
      'ITEM 2: Совет + объяснение',
      'ITEM 3: Совет + объяснение',
      'BONUS: "Ещё 12 протоколов в нейрогайде"',
      'CTA: "Ссылка в шапке"',
    ],
    example: [
      '3 вещи, которые убивают твою концентрацию каждое утро.',
      '1. Проверка телефона в первые 30 минут — убивает дофаминовый всплеск.',
      '2. Отсутствие утреннего света — мелатонин не выключается, мозг спит.',
      '3. Кофеин до 90 минут после пробуждения — блокирует кортизоловый пик.',
      'В нейрогайде ещё 12 протоколов для оптимизации.',
      'Ссылка в шапке — забери бесплатно.',
    ],
  },
  'storytime': {
    name: 'Storytime (личная история)',
    structure: [
      'HOOK: "Я чуть не бросил всё из-за [проблема]"',
      'CONTEXT: Расскажи ситуацию',
      'TURNING POINT: Что нашёл/понял',
      'LESSON: Что извлёк (совет)',
      'CTA: "Весь путь в нейрогайде"',
    ],
    example: [
      'Я чуть не бросил бизнес из-за выгорания.',
      '3 месяца работал по 14 часов, не мог спать, забыл как отдыхать.',
      'Нашёл протокол архитектуры сна — за неделю вернул нормальный отдых.',
      'Сон — это не слабость. Это топливо для мозга.',
      'Весь мой путь оптимизации — в нейрогайде. Ссылка в шапке.',
    ],
  },
};

const reelsSlides = {
  'problem-solution': 'Одно видео 15-30 сек',
  'myths-reality': 'Одно видео 30-60 сек',
  'before-after': 'Одно видео 15-30 сек',
  'list': 'Одно видео 30-60 сек',
  'storytime': 'Одно видео 30-60 сек',
};

const carouselSlides = {
  'problem-solution': '5-7 слайдов',
  'myths-reality': '6-8 слайдов (миф→реальность)',
  'before-after': '4-6 слайдов (до→после)',
  'list': '5-7 слайдов (1 совет = 1 слайд)',
  'storytime': '7-10 слайдов (история пошагово)',
};

const topics = [
  'Дофаминовый детокс',
  'Архитектура сна',
  'Утренняя рутина',
  'Продуктивность',
  'Концентрация и фокус',
  'Медитация',
  'Ноотропы и добавки',
  'Физика и мозг',
  'Стресс-менеджмент',
  'Когнитивные искажения',
];

export default function ScriptGenerator() {
  const [format, setFormat] = useState<Format>('reels');
  const [scriptType, setScriptType] = useState<ScriptType>('problem-solution');
  const [topic, setTopic] = useState(topics[0]);
  const [copied, setCopied] = useState(false);

  const template = templates[scriptType];

  const formatLabel = format === 'reels' ? 'Instagram Reels' : format === 'carousel' ? 'Карусель' : 'YouTube Shorts';
  const slidesInfo = format === 'carousel' ? carouselSlides[scriptType] : reelsSlides[scriptType];

  const generatedScript = `=== ${formatLabel} ===
Тип: ${template.name}
Тема: ${topic}
Формат: ${slidesInfo}

--- СТРУКТУРА ---
${template.structure.map((s, i) => `${i + 1}. ${s.replace('[N]', '3')}`).join('\n')}

--- ПРИМЕР ЗАПОЛНЕНИЯ ---
${template.example.join('\n\n')}

--- ГОТОВЫЙ ТЕКСТ ---
${format === 'carousel'
  ? template.example.map((s, i) => `Слайд ${i + 1}: ${s}`).join('\n')
  : template.example.join(' → ')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-deep-space text-txt-primary p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-3xl font-bold mb-2">
          Генератор скриптов
        </h1>
        <p className="text-txt-secondary mb-8">
          Создавай скрипты для рилс, каруселей и Shorts за 30 секунд
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Format */}
          <div>
            <label className="block font-mono text-xs text-txt-muted mb-2 uppercase tracking-wider">
              Формат
            </label>
            <div className="flex gap-2">
              {([['reels', 'Reels'], ['carousel', 'Карусель'], ['shorts', 'Shorts']] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFormat(key)}
                  className={`px-3 py-2 text-sm font-mono rounded transition-all ${
                    format === key
                      ? 'bg-spectr-cyan text-black'
                      : 'border border-white/10 text-txt-secondary hover:border-spectr-cyan/50'
                  }`}
                  style={{ borderRadius: '4px' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Script Type */}
          <div>
            <label className="block font-mono text-xs text-txt-muted mb-2 uppercase tracking-wider">
              Тип скрипта
            </label>
            <select
              value={scriptType}
              onChange={(e) => setScriptType(e.target.value as ScriptType)}
              className="w-full bg-deep-obsidian border border-white/10 text-txt-primary px-3 py-2 text-sm rounded"
              style={{ borderRadius: '4px' }}
            >
              {Object.entries(templates).map(([key, t]) => (
                <option key={key} value={key}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block font-mono text-xs text-txt-muted mb-2 uppercase tracking-wider">
              Тема
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-deep-obsidian border border-white/10 text-txt-primary px-3 py-2 text-sm rounded"
              style={{ borderRadius: '4px' }}
            >
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generated Script */}
        <div className="relative bg-deep-obsidian border border-white/10 rounded p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs text-txt-muted uppercase tracking-wider">
              Сгенерированный скрипт
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-white/10 text-txt-secondary hover:border-spectr-cyan hover:text-spectr-cyan transition-all rounded"
              style={{ borderRadius: '4px' }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Скопировано!' : 'Копировать'}
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-txt-secondary font-body leading-relaxed">
            {generatedScript}
          </pre>
        </div>

        {/* Quick Templates */}
        <div className="mt-8">
          <h3 className="font-mono text-xs text-txt-muted mb-3 uppercase tracking-wider">
            Быстрые шаблоны
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(templates).map(([key, t]) => (
              <button
                key={key}
                onClick={() => setScriptType(key as ScriptType)}
                className={`text-left p-4 border rounded transition-all ${
                  scriptType === key
                    ? 'border-spectr-cyan/40 bg-spectr-cyan/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
                style={{ borderRadius: '4px' }}
              >
                <p className="text-sm font-semibold text-txt-primary mb-1">{t.name}</p>
                <p className="text-xs text-txt-muted">{t.structure.length} частей</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
