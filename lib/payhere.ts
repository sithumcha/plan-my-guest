import crypto from 'crypto';

export interface PayHereParams {
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  order_id: string;
  items: string;
  currency: 'LKR' | 'USD';
  amount: string;
  hash: string;
}

export function generatePayHereHash(
  merchantId: string,
  orderId: string,
  amount: number,
  currency: string,
  merchantSecret: string
): string {
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).replace(/,/g, '');

  const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();

  const hashString = `${merchantId}${orderId}${formattedAmount}${currency}${secretHash}`;
  
  return crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();
}

export function verifyPayHereMd5Sig(
  merchantId: string,
  orderId: string,
  payhereAmount: string,
  payhereCurrency: string,
  statusCode: string,
  merchantSecret: string,
  md5sig: string
): boolean {
  const secretHash = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const rawString = `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${secretHash}`;
  const calculatedSig = crypto.createHash('md5').update(rawString).digest('hex').toUpperCase();
  return calculatedSig === md5sig;
}
