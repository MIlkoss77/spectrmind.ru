const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MERCHANT_LOGIN = process.env.ROBOKASSA_MERCHANT_LOGIN;
const PASSWORD_1 = process.env.ROBOKASSA_PASSWORD_1;
const PASSWORD_2 = process.env.ROBOKASSA_PASSWORD_2;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: GMAIL_USER, pass: GMAIL_PASS }
});

const PRODUCTS = {
  'neuro-hacker': { name: 'Нейро-Хакер', sum: 1990, description: 'Доступ к базе протоколов' },
  'spectr-club': { name: 'SPECTR CLUB', sum: 990, description: 'Подписка на клуб (1 месяц)' },
  'base-club': { name: 'База + 1 неделя клуба', sum: 2490, description: 'Доступ к базе + пробный клуб' },
  'neuro-master': { name: 'Нейро-Мастер', sum: 9990, description: 'Максимальный пакет' }
};

const LINKS = {
  drive: 'https://drive.google.com/drive/folders/1TVRiFfieciasYZRKRbIa0E2v4-s_jpsW?usp=sharing',
  telegram: 'https://t.me/+xZWdiP2okdU3NjAy',
  manager: 'https://t.me/darkrosegold'
};

const EMAIL_TEMPLATES = {
  'neuro-hacker': {
    subject: 'SPECTRMIND — Спасибо за покупку!',
    html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#0A0A0F;color:#fff;border-radius:12px"><div style="text-align:center;margin-bottom:30px"><h1 style="color:#00FFFF;font-size:28px;margin:0">SPECTRMIND</h1></div><div style="background:linear-gradient(135deg,#00FFFF,#A855F7);padding:3px;border-radius:12px"><div style="background:#13131A;padding:30px;border-radius:10px"><h2 style="color:#00FFFF;text-align:center;margin-top:0;font-size:22px">Спасибо за покупку!</h2><p style="text-align:center;color:#A0A0B0;font-size:16px">Добро пожаловать в мир нейро-оптимизации. Вы сделали отличный выбор.</p><div style="background:#1C1C24;padding:20px;border-radius:8px;margin:25px 0;text-align:center"><p style="color:#6B6B7B;font-size:12px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:0.1em">Ваш доступ</p><h3 style="color:#00FFFF;margin:0 0 15px 0;font-size:18px">Нейро-Хакер</h3><a href="' + LINKS.drive + '" style="display:inline-block;background:#00FFFF;color:#000;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px">Открыть PDF-гайд</a></div><p style="color:#6B6B7B;font-size:13px;text-align:center">Начните с первого протокола и следуйте инструкциям.</p></div></div><p style="color:#6B6B7B;font-size:11px;text-align:center;margin-top:20px">Если у вас есть вопросы — напишите в поддержку.</p></div>'
  },
  'spectr-club': {
    subject: 'SPECTRMIND — Добро пожаловать в клуб!',
    html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#0A0A0F;color:#fff;border-radius:12px"><div style="text-align:center;margin-bottom:30px"><h1 style="color:#00FFFF;font-size:28px;margin:0">SPECTRMIND</h1></div><div style="background:linear-gradient(135deg,#00FFFF,#A855F7);padding:3px;border-radius:12px"><div style="background:#13131A;padding:30px;border-radius:10px"><h2 style="color:#00FFFF;text-align:center;margin-top:0;font-size:22px">Добро пожаловать в клуб!</h2><p style="text-align:center;color:#A0A0B0;font-size:16px">Вы присоединились к закрытому сообществу нейро-оптимизаторов.</p><div style="background:#1C1C24;padding:20px;border-radius:8px;margin:25px 0;text-align:center"><p style="color:#6B6B7B;font-size:12px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:0.1em">Ваш доступ</p><h3 style="color:#00FFFF;margin:0 0 15px 0;font-size:18px">SPECTR CLUB</h3><a href="' + LINKS.telegram + '" style="display:inline-block;background:#00FFFF;color:#000;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px">Вступить в Telegram-канал</a></div><p style="color:#6B6B7B;font-size:13px;text-align:center">Каждый день — микро-протоколы, голосовые чаты и поддержка.</p></div></div></div>'
  },
  'base-club': {
    subject: 'SPECTRMIND — Спасибо за покупку!',
    html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#0A0A0F;color:#fff;border-radius:12px"><div style="text-align:center;margin-bottom:30px"><h1 style="color:#00FFFF;font-size:28px;margin:0">SPECTRMIND</h1></div><div style="background:linear-gradient(135deg,#00FFFF,#A855F7);padding:3px;border-radius:12px"><div style="background:#13131A;padding:30px;border-radius:10px"><h2 style="color:#00FFFF;text-align:center;margin-top:0;font-size:22px">Спасибо за покупку!</h2><p style="text-align:center;color:#A0A0B0;font-size:16px">Вы получили доступ к базе протоколов и пробный период в клубе.</p><div style="background:#1C1C24;padding:20px;border-radius:8px;margin:25px 0;text-align:center"><p style="color:#6B6B7B;font-size:12px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:0.1em">PDF-гайд с протоколами</p><a href="' + LINKS.drive + '" style="display:inline-block;background:#00FFFF;color:#000;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px">Открыть гайд</a></div><div style="background:#1C1C24;padding:20px;border-radius:8px;margin:25px 0;text-align:center"><p style="color:#6B6B7B;font-size:12px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:0.1em">Пробный доступ в Telegram (7 дней)</p><a href="' + LINKS.telegram + '" style="display:inline-block;background:#A855F7;color:#fff;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px">Вступить в канал</a></div><p style="color:#6B6B7B;font-size:13px;text-align:center">Начните с гайда, а клуб раскроет практики на каждый день.</p></div></div></div>'
  },
  'neuro-master': {
    subject: 'SPECTRMIND — Нейро-Мастер: полный доступ',
    html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:30px;background:#0A0A0F;color:#fff;border-radius:12px"><div style="text-align:center;margin-bottom:30px"><h1 style="color:#00FFFF;font-size:28px;margin:0">SPECTRMIND</h1></div><div style="background:linear-gradient(135deg,#00FFFF,#A855F7);padding:3px;border-radius:12px"><div style="background:#13131A;padding:30px;border-radius:10px"><h2 style="color:#00FFFF;text-align:center;margin-top:0;font-size:22px">Поздравляем!</h2><p style="text-align:center;color:#A0A0B0;font-size:16px">Вы получили максимальный пакет. Это ваш путь к пиковой когнитивной производительности.</p><div style="background:#1C1C24;padding:20px;border-radius:8px;margin:25px 0;text-align:center"><p style="color:#6B6B7B;font-size:12px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:0.1em">1. PDF-гайд с протоколами</p><a href="' + LINKS.drive + '" style="display:inline-block;background:#00FFFF;color:#000;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px">Открыть гайд</a></div><div style="background:#1C1C24;padding:20px;border-radius:8px;margin:25px 0;text-align:center"><p style="color:#6B6B7B;font-size:12px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:0.1em">2. SPECTR CLUB (3 месяца)</p><a href="' + LINKS.telegram + '" style="display:inline-block;background:#A855F7;color:#fff;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px">Вступить в канал</a></div><div style="background:#1C1C24;padding:20px;border-radius:8px;margin:25px 0;text-align:center"><p style="color:#6B6B7B;font-size:12px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:0.1em">3. Запись на персональные сессии</p><p style="color:#A0A0B0;font-size:14px;margin:0 0 15px 0">2 сессии с нейропсихологом (60 мин). Напишите менеджеру для записи:</p><a href="' + LINKS.manager + '" style="display:inline-block;background:linear-gradient(135deg,#00FFFF,#A855F7);color:#000;padding:14px 32px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px">Записаться на сессию</a></div></div></div></div>'
  }
};

const orders = new Map();

function generateReceipt(product) {
  return JSON.stringify({
    sno: 'usn_income',
    items: [{
      name: product.name,
      quantity: 1,
      sum: product.sum,
      payment_method: 'full_payment',
      payment_object: 'service',
      tax: 'none'
    }]
  });
}

function generateSignature(outSum, invId, receipt) {
  const receiptEncoded = encodeURIComponent(receipt);
  const signString = MERCHANT_LOGIN + ':' + outSum + ':' + invId + ':' + receiptEncoded + ':' + PASSWORD_1;
  return crypto.createHash('md5').update(signString).digest('hex');
}

function verifyCallbackSignature(params) {
  var outSum = params.OutSum || params.outSum;
  var invId = params.InvId || params.invId;
  var receipt = params.Receipt || params.receipt || '';
  var signString = MERCHANT_LOGIN + ':' + outSum + ':' + invId + ':' + receipt + ':' + PASSWORD_2;
  var expectedSign = crypto.createHash('md5').update(signString).digest('hex').toUpperCase();
  var receivedSign = (params.SignatureValue || params.signatureValue || '').toUpperCase();
  return expectedSign === receivedSign;
}

async function sendProductEmail(email, tier) {
  var template = EMAIL_TEMPLATES[tier];
  if (!template) return;
  await transporter.sendMail({
    from: 'SPECTRMIND <' + GMAIL_USER + '>',
    to: email,
    subject: template.subject,
    html: template.html
  });
  console.log('Email sent to ' + email + ' for tier ' + tier);
}

app.post('/api/create-payment', function(req, res) {
  var tier = req.body.tier;
  var product = PRODUCTS[tier];
  if (!product) return res.status(400).json({ error: 'Unknown tier' });

  var invId = Date.now();
  var outSum = product.sum.toFixed(2);
  var receipt = generateReceipt(product);
  var receiptEncoded = encodeURIComponent(receipt);
  var signature = generateSignature(outSum, invId, receipt);

  orders.set(invId.toString(), { tier: tier, email: null, status: 'pending' });

  var params = new URLSearchParams({
    MerchantLogin: MERCHANT_LOGIN,
    OutSum: outSum,
    InvId: invId.toString(),
    Description: product.description,
    SignatureValue: signature,
    Receipt: receiptEncoded,
    Culture: 'ru',
    Encoding: 'UTF-8'
  });

  var url = 'https://auth.robokassa.ru/Merchant/Index.aspx?' + params.toString();
  res.json({ url: url });
});

app.post('/api/payment-callback', async function(req, res) {
  try {
    console.log('Callback received:', JSON.stringify(req.body));

    if (!verifyCallbackSignature(req.body)) {
      console.error('Invalid signature');
      return res.status(400).send('INVALID SIGNATURE');
    }

    var invId = (req.body.InvId || req.body.invId || '').toString();
    var email = req.body.Email || req.body.email || '';
    var order = orders.get(invId);

    if (order) {
      order.email = email;
      order.status = 'paid';
    }

    if (email && order) {
      await sendProductEmail(email, order.tier);
    }

    res.send('OK');
  } catch (err) {
    console.error('Callback error:', err);
    res.send('OK');
  }
});

var PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log('Robokassa API running on port ' + PORT);
});