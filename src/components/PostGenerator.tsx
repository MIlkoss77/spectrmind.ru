import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

type Formula = 'aida' | 'pas' | 'bab' | 'four-u';
type Platform = 'instagram' | 'vk' | 'youtube';

const formulas: Record<Formula, { name: string; structure: string[] }> = {
  aida: {
    name: 'AIDA',
    structure: ['Attention (Внимание)', 'Interest (Интерес)', 'Desire (Желание)', 'Action (Действие)'],
  },
  pas: {
    name: 'PAS',
    structure: ['Problem (Проблема)', 'Agitate (Усиление)', 'Solution (Решение)'],
  },
  bab: {
    name: 'Before-After-Bridge',
    structure: ['Before (До)', 'After (После)', 'Bridge (Мост — как перейти)'],
  },
  'four-u': {
    name: '4U',
    structure: ['Useful (Полезно)', 'Urgent (Срочно)', 'Unique (Уникально)', 'Ultra-specific (Конкретно)'],
  },
};

const topics = [
  'Почему ты устаешь к обеду',
  '3 привычки, которые убивают фокус',
  'Как восстановить дофамин за 7 дней',
  'Архитектура сна: протокол на 14 дней',
  'Ноотропы: что работает, а что нет',
  'Утренняя рутина для суперфокуса',
  'Как перестать отвлекаться',
  'Стресс как топливо: хакерство кортизола',
];

const hashtags = [
  '#нейрогайд', '#продуктивность', '#фокус', '#концентрация',
  '#нейронаука', '#саморазвитие', '#дофамин', '#медитация',
  '#сон', '#ноотропы', '#протоколы', '#когнитивныефункции',
  '#мозг', '#оптимизация', '#биохакинг', '#спектр',
];

function generatePostText(
  formula: Formula,
  topic: string,
  platform: Platform
): string {
  const f = formulas[formula];

  const templates: Record<Formula, Record<Platform, string>> = {
    aida: {
      instagram: `🔥 ${topic}

Ты замечал, как сложно сосредоточиться, когда телефон пингует каждые 5 минут?

Каждый день мы теряем 2-3 часа продуктивности из-за неправильной работы дофаминовой системы. Это не лень — это нейробиология.

Представь: ты просыпаешься бодрым, фокус держится до обеда, а вечером засыпаешь за 15 минут. Это реальность с протоколами из нейрогайда.

Забери бесплатный протокол дофаминового детокса — ссылка в шапке 👆

${hashtags.slice(0, 8).join(' ')}`,

      vk: `${topic}

Знакомо: сел за работу, через 20 минут уже в телефоне? Не ты виноват — твоя дофаминовая система сбилась.

Каждый скроллинг — этоicro-награда, которая обнуляет твой фокус. Мозг привыкает к лёгким дофаминовым всплескам и перестаёт работать на длинных дистанциях.

Решение — протокол дофаминового детокса. 7 дней. Без таблеток. Результат на второй день.

Полный протокол — в нейрогайде. Ссылка в закреплённом комментарии.

${hashtags.join(' ')}`,

      youtube: `${topic}

В этом Shorts я покажу 3 признака того, что твой дофаминовый контур нуждается в перезагрузке.

Если ты не можешь читать больше 10 минут — это первый признак.
Если засыпаешь больше 30 минут — второй.
Если утром нужен кофеин до пробуждения — третий.

Полный протокол восстановления — в нейрогайде. Ссылка в описании.

${hashtags.slice(0, 6).join(' ')}`,
    },
    pas: {
      instagram: `⚠️ ${topic}

Твоя проблема: ты не можешь сосредоточиться дольше 20 минут. Знакомо?

Каждый день ты теряешь 3 часа продуктивности. За месяц — 90 часов. За год — целая рабочая неделя, упущенная в скроллинге.

Вот что работает: протокол восстановления дофамина из нейрогайда. 7 дней. Без таблеток. Результат — фокус на 3+ часа.

Забери бесплатно → ссылка в шапке

${hashtags.slice(0, 8).join(' ')}`,

      vk: `${topic}

Проблема: ты устаёшь к обеду и не можешь ничего сделать после 16:00.

Усиление: это не возраст и не лень. Это перегруженная дофаминовая система. Каждый пинг телефона —micro-удар по твоему фокусу.

Решение: протокол из нейрогайда. 7 дней. Без таблеток. Результат на второй день.

Ссылка в закреплённом комментарии.

${hashtags.join(' ')}`,

      youtube: `${topic}

Проблема: не можешь сосредоточиться.

Усиление: теряешь 3 часа продуктивности каждый день.

Решение: протокол дофаминового детокса. 7 дней. Результат на второй день.

Нейрогайд — ссылка в описании.

${hashtags.slice(0, 6).join(' ')}`,
    },
    bab: {
      instagram: `До vs После: ${topic}

ДО:
— Встаёшь в 10, зомби до обеда
— Не можешь читать дольше 10 минут
— Засыпаешь в 2 часа ночи

ПОСЛЕ (через 14 дней):
— Встаёшь в 6:30 бодрым
— Фокус 3+ часа без перерывов
— Засыпаешь за 15 минут

Мост: 2 протокола из нейрогайда. Архитектура сна + утренний свет.

Хочешь так же? Ссылка в шапке 👆

${hashtags.slice(0, 8).join(' ')}`,

      vk: `${topic}

Было:
— Утром кофеин, чтобы встать
— К обеду — зомби
— Вечером — сон в 2 часа

Стало (через 14 дней):
— Утром — бодрость без будильника
— Днём — фокус до обеда
— Вечером — засыпаю за 15 минут

Как? 2 протокола из нейрогайда.

Полный путь — ссылка в закреплённом комментарии.

${hashtags.join(' ')}`,

      youtube: `${topic}

До: зомби до обеда, засыпаю в 2 часа.
После: бодрость с 6:30, фокус 3+ часа.

Мост: протоколы из нейрогайда. Ссылка в описании.

${hashtags.slice(0, 6).join(' ')}`,
    },
    'four-u': {
      instagram: `💡 ${topic} — Полезно, Срочно, Уникально, Конкретно

ПОЛЕЗНО: 3 привычки, которые мгновенно улучшают концентрацию.

СРОЧНО: Каждый день промедления = 3 часа потерянной продуктивности.

УНИКАЛЬНО: Протоколы основаны на нейронауке, а не на мотивашках.

КОНКРЕТНО: Утренний свет 10 мин → дофамин +40%. Без кофеина первые 90 минут.

Полные протоколы → ссылка в шапке

${hashtags.slice(0, 8).join(' ')}`,

      vk: `${topic}

Полезно: 3 привычки для концентрации.
Срочно: Каждый день = 3 часа потерянной продуктивности.
Уникально: Научные протоколы, не мотивация.
Конкретно: Утренний свет 10 мин → дофамин +40%.

Ссылка в закреплённом комментарии.

${hashtags.join(' ')}`,

      youtube: `${topic}

Полезно: 3 привычки для фокуса.
Срочно: Теряешь 3 часа каждый день.
Уникально: Научный подход.
Конкретно: Свет 10 мин = дофамин +40%.

Нейрогайд — ссылка в описании.

${hashtags.slice(0, 6).join(' ')}`,
    },
  };

  return templates[formula][platform];
}

export default function PostGenerator() {
  const [formula, setFormula] = useState<Formula>('aida');
  const [topic, setTopic] = useState(topics[0]);
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [copied, setCopied] = useState(false);

  const generated = generatePostText(formula, topic, platform);

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-deep-space text-txt-primary p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-3xl font-bold mb-2">
          Генератор постов
        </h1>
        <p className="text-txt-secondary mb-8">
          Готовые тексты по формулам AIDA, PAS, Before-After-Bridge, 4U
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Formula */}
          <div>
            <label className="block font-mono text-xs text-txt-muted mb-2 uppercase tracking-wider">
              Формула
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(formulas).map(([key, f]) => (
                <button
                  key={key}
                  onClick={() => setFormula(key as Formula)}
                  className={`px-3 py-2 text-sm font-mono rounded transition-all ${
                    formula === key
                      ? 'bg-spectr-cyan text-black'
                      : 'border border-white/10 text-txt-secondary hover:border-spectr-cyan/50'
                  }`}
                  style={{ borderRadius: '4px' }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="block font-mono text-xs text-txt-muted mb-2 uppercase tracking-wider">
              Платформа
            </label>
            <div className="flex gap-2">
              {([['instagram', 'IG'], ['vk', 'VK'], ['youtube', 'YT']] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPlatform(key)}
                  className={`px-3 py-2 text-sm font-mono rounded transition-all ${
                    platform === key
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

        {/* Formula Structure */}
        <div className="mb-6 p-4 bg-deep-obsidian border border-white/10 rounded">
          <p className="font-mono text-xs text-txt-muted mb-2 uppercase tracking-wider">
            Структура {formulas[formula].name}
          </p>
          <div className="flex flex-wrap gap-2">
            {formulas[formula].structure.map((s, i) => (
              <span key={i} className="px-3 py-1 text-xs font-mono bg-spectr-cyan/10 text-spectr-cyan border border-spectr-cyan/20 rounded"
                style={{ borderRadius: '4px' }}>
                {i + 1}. {s}
              </span>
            ))}
          </div>
        </div>

        {/* Generated Post */}
        <div className="relative bg-deep-obsidian border border-white/10 rounded p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs text-txt-muted uppercase tracking-wider">
              Готовый пост
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
            {generated}
          </pre>
        </div>

        {/* Hashtag Reference */}
        <div className="mt-8 p-4 bg-deep-obsidian border border-white/10 rounded">
          <p className="font-mono text-xs text-txt-muted mb-3 uppercase tracking-wider">
            Хештеги (копируй нужные)
          </p>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((h) => (
              <span key={h} className="px-2 py-1 text-xs font-mono text-txt-muted border border-white/5 rounded cursor-pointer hover:text-spectr-cyan hover:border-spectr-cyan/30 transition-all"
                style={{ borderRadius: '4px' }}
                onClick={() => { navigator.clipboard.writeText(h); }}>
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
