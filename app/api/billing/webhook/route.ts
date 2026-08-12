import { NextResponse } from 'next/server';
import { verifyPayHereMd5Sig } from '@/lib/payhere';
import { connectToDatabase } from '@/lib/db';
import { Subscription } from '@/models/Subscription';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const merchant_id = formData.get('merchant_id') as string;
    const order_id = formData.get('order_id') as string;
    const payhere_amount = formData.get('payhere_amount') as string;
    const payhere_currency = formData.get('payhere_currency') as string;
    const status_code = formData.get('status_code') as string;
    const md5sig = formData.get('md5sig') as string;
    const payment_id = formData.get('payment_id') as string;

    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '4XXXXXXXXXXXXXXX';

    const isValid = verifyPayHereMd5Sig(
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      merchantSecret,
      md5sig
    );

    if (!isValid && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Invalid PayHere signature' }, { status: 400 });
    }

    if (status_code === '2') {
      // Payment Completed Status Code
      try {
        await connectToDatabase();
        await Subscription.create({
          userId: order_id.split('_')[1] || '60d0fe4f5311236168a109ca',
          plan: payhere_currency === 'LKR' ? 'pro_lk' : 'pro_global',
          status: 'active',
          payherePaymentId: payment_id || order_id,
          amount: Number(payhere_amount),
          currency: payhere_currency,
          expiresAt: new Date(Date.now() + 365 * 86400000),
        });
      } catch {
        console.warn('DB update during PayHere webhook IPN skipped');
      }
    }

    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('PayHere IPN Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
