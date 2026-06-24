import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deep-space text-txt-primary py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-txt-secondary hover:text-spectr-cyan transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">На главную</span>
        </button>

        <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">
          Политика конфиденциальности
        </h1>
        <p className="font-mono text-xs text-txt-muted mb-8">
          В соответствии с ФЗ-152 "О персональных данных"
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-txt-secondary text-sm leading-relaxed">
          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              1. Общие положения
            </h2>
            <p>
              Настоящая политика конфиденциальности описывает, как SpectrMind
              собирает, использует и защищает персональные данные пользователей
              в соответствии с Федеральным законом № 152-ФЗ "О персональных
              данных".
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              2. Сбор данных
            </h2>
            <p>Мы можем собирать следующие данные:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Имя и контактная информация (email)</li>
              <li>Демографическая информация</li>
              <li>Данные об использовании сервиса</li>
              <li>Информация об устройстве и браузере</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              3. Использование данных
            </h2>
            <p>Собранные данные используются для:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Предоставления доступа к платформе</li>
              <li>Улучшения качества сервиса</li>
              <li>Отправки важных уведомлений</li>
              <li>Персонализации контента</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              4. Защита данных
            </h2>
            <p>
              Мы принимаем соответствующие меры для защиты персональных данных
              от несанкционированного доступа, изменения, раскрытия или
              уничтожения. Все данные передаются через защищенное SSL-соединение.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              5. Cookies
            </h2>
            <p>
              Мы используем cookies для улучшения пользовательского опыта.
              Продолжая использовать сайт, вы соглашаетесь с использованием
              cookies.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              6. Контакты
            </h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь:
              <br />
              Email: privacy@spectrmind.ru
              <br />
              Дороненко В.С., ИНН 463245967103
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
