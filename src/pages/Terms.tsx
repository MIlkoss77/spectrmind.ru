import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Terms() {
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
          Публичная оферта
        </h1>
        <p className="font-mono text-xs text-txt-muted mb-8">
          Договор оказания информационных услуг
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-txt-secondary text-sm leading-relaxed">
          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              1. Общие положения
            </h2>
            <p>
              Настоящий документ является публичной офертой Дороненко В.С. (далее —
              "Исполнитель") и содержит все существенные условия договора об оказании
              информационных услуг через платформу SpectrMind.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              2. Предмет договора
            </h2>
            <p>
              Исполнитель обязуется предоставить Заказчику доступ к образовательным
              материалам и протоколам когнитивной оптимизации, а Заказчик обязуется
              оплатить указанные услуги.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              3. Стоимость и оплата
            </h2>
            <p>
              Стоимость услуг указана на странице "Цены". Оплата производится через
              платежные системы ЮKassa, СБП, СберPay, Тинькофф Pay или ЮMoney. Доступ
              предоставляется сразу после подтверждения оплаты.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              4. Права и обязанности сторон
            </h2>
            <p>
              <strong className="text-txt-primary">Исполнитель обязуется:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Предоставить доступ к оплаченным материалам</li>
              <li>Обеспечить техническую работоспособность платформы</li>
              <li>Обновлять и дополнять контент</li>
            </ul>
            <p className="mt-3">
              <strong className="text-txt-primary">Заказчик обязуется:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Своевременно оплачивать услуги</li>
              <li>Не передавать доступ третьим лицам</li>
              <li>Соблюдать правила использования платформы</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              5. Возврат средств
            </h2>
            <p>
              Возврат средств осуществляется в течение 30 дней с момента оплаты при
              соблюдении условий "30-дневной когнитивной гарантии". Для запроса
              возврата необходимо обратиться в поддержку.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              6. Ответственность
            </h2>
            <p>
              SpectrMind — образовательная платформа. Контент предоставляется
              исключительно в информационных целях и не является медицинской
              консультацией. Перед применением любых протоколов проконсультируйтесь
              с квалифицированным специалистом.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              7. Реквизиты
            </h2>
            <p>
              Дороненко В.С.
              <br />
              ИНН: 463245967103
              <br />
              Email: support@spectrmind.ru
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
