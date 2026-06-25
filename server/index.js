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
    subject: 'Ваш заказ Нейро-Хакер',
    html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0A0A0F;color:#fff"><h2 style="color:#00FFFF">SPECTRMIND — Нейро-Хакер</h2><p>Спасибо за покупку! Вот ваш доступ:</p><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">PDF-гайд с протоколами</h3><a href="' + LINKS.drive + '" style="display:inline-block;background:#00FFFF;color:#000;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Открыть гайд</a></div><p style="color:#6B6B7B;font-size:12px">Если есть вопросы — напишите менеджеру: <a href="' + LINKS.manager + '" style="color:#00FFFF">@darkrosegold</a></p></div>'
  },
  'spectr-club': {
    subject: 'Ваш заказ SPECTR CLUB — Добро пожаловать!',
    html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0A0A0F;color:#fff"><h2 style="color:#00FFFF">SPECTR CLUB</h2><p>Добро пожаловать в клуб!</p><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">Закрытый Telegram-канал</h3><a href="' + LINKS.telegram + '" style="display:inline-block;background:#00FFFF;color:#000;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Вступить в канал</a></div><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">Ваш менеджер</h3><a href="' + LINKS.manager + '" style="display:inline-block;background:#A855F7;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Написать менеджеру</a></div></div>'
  },
  'base-club': {
    subject: 'Ваш заказ База + Клуб',
    html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0A0A0F;color:#fff"><h2 style="color:#00FFFF">SPECTRMIND — База + 1 неделя клуба</h2><p>Спасибо за покупку!</p><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">PDF-гайд</h3><a href="' + LINKS.drive + '" style="display:inline-block;background:#00FFFF;color:#000;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Открыть гайд</a></div><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">Пробный доступ в Telegram (7 дней)</h3><a href="' + LINKS.telegram + '" style="display:inline-block;background:#00FFFF;color:#000;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Вступить</a></div><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">Менеджер</h3><a href="' + LINKS.manager + '" style="display:inline-block;background:#A855F7;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Написать</a></div></div>'
  },
  'neuro-master': {
    subject: 'Ваш заказ Нейро-Мастер — Максимальный пакет',
    html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0A0A0F;color:#fff"><h2 style="color:#00FFFF">SPECTRMIND — Нейро-Мастер</h2><p>Поздравляем! Вы получили максимальный пакет.</p><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">1. PDF-гайд с протоколами</h3><a href="' + LINKS.drive + '" style="display:inline-block;background:#00FFFF;color:#000;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Открыть гайд</a></div><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">2. SPECTR CLUB (3 месяца)</h3><a href="' + LINKS.telegram + '" style="display:inline-block;background:#00FFFF;color:#000;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Вступить в канал</a></div><div style="background:#13131A;padding:20px;border-radius:8px;margin:20px 0"><h3 style="color:#00FFFF;margin-top:0">3. Персональные сессии</h3><p>Для записи на 2 сессии с нейропсихологом свяжитесь с менеджером:</p><a href="' + LINKS.manager + '" style="display:inline-block;background:#A855F7;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold">Написать менеджеру</a></div></div>'
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