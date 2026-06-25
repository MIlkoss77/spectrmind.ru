const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());
app.use(express.json());

const MERCHANT_LOGIN = process.env.ROBOKASSA_MERCHANT_LOGIN;
const PASSWORD_1 = process.env.ROBOKASSA_PASSWORD_1;

const PRODUCTS = {
  'neuro-hacker': { name: 'Нейро-Хакер', sum: 1990, description: 'Доступ к базе протоколов' },
  'spectr-club': { name: 'SPECTR CLUB', sum: 990, description: 'Подписка на клуб (1 месяц)' },
  'base-club': { name: 'База + 1 неделя клуба', sum: 2490, description: 'Доступ к базе + пробный клуб' },
  'neuro-master': { name: 'Нейро-Мастер', sum: 9990, description: 'Максимальный пакет' }
};

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
  const signString = `${MERCHANT_LOGIN}:${outSum}:${invId}:${receiptEncoded}:${PASSWORD_1}`;
  return crypto.createHash('md5').update(signString).digest('hex');
}

app.post('/api/create-payment', (req, res) => {
  const { tier } = req.body;
  const product = PRODUCTS[tier];

  if (!product) {
    return res.status(400).json({ error: 'Unknown tier' });
  }

  const invId = Date.now();
  const outSum = product.sum.toFixed(2);
  const receipt = generateReceipt(product);
  const receiptEncoded = encodeURIComponent(receipt);
  const signature = generateSignature(outSum, invId, receipt);

  const params = new URLSearchParams({
    MerchantLogin: MERCHANT_LOGIN,
    OutSum: outSum,
    InvId: invId.toString(),
    Description: product.description,
    SignatureValue: signature,
    Receipt: receiptEncoded,
    Culture: 'ru',
    Encoding: 'UTF-8'
  });

  const url = `https://auth.robokassa.ru/Merchant/Index.aspx?${params.toString()}`;
  res.json({ url });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Robokassa API running on port ${PORT}`);
});